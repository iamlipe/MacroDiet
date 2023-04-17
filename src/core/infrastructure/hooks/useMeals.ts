import { InfoFoodProps } from '@core/domain/models/Food';
import { MealProps } from '@core/domain/models/Meal';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useToast } from './useToast';
import { handleErrorFirestore } from '@utils/helpers/handleErrors';
import { GetMealsUseCase } from '@core/domain/useCases/GetMeals';
import { useMealStore } from '@core/infrastructure/store/mealStore';
import { GetMealsDayUseCase } from '@core/domain/useCases/GetMealsDay';
import { CreateMealsDayUseCase } from '@core/domain/useCases/CreateMealsDay';
import { useUserStore } from '@core/infrastructure/store/userStore';
import { useMeasure } from './useMeasure';
import { useFood } from './useFood';
import { UpdateMealUseCase } from '@core/domain/useCases/UpdateMeal';
import { RemoveMealUseCase } from '@core/domain/useCases/RemoveMeal';
import { useLoader } from './useLoader';
import { CreateMealUseCase } from '@core/domain/useCases/CreateMeal';
import { CreateMealForm } from '../validators/createMealSchema';
import { formatDate } from '@utils/helpers/format';

export const useMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();
  const { setMealList, setMealDayList } = useMealStore();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoarder } = useLoader();
  const { infoMeasure } = useMeasure();
  const { infoFood } = useFood();

  const fetchMealsDay = async () => {
    setIsLoading(true);

    try {
      const mealsDay = await new GetMealsDayUseCase().execute();

      if (!mealsDay.length) {
        await createMealsDay();
      } else {
        setMealDayList(mealsDay);
      }
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMeals = async () => {
    setIsLoading(true);

    try {
      const meals = await new GetMealsUseCase().execute();

      if (meals) {
        setMealList(meals);
      }
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
    }
  };

  const createMeal = async (values: CreateMealForm) => {
    setIsLoading(true);
    showLoader();

    try {
      await new CreateMealUseCase().execute({
        title: values.title,
        time: formatDate(values.mealTime),
      });

      await fetchMealsDay();
    } catch (error) {
      console.log(error);

      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
      hideLoarder();
    }
  };

  const createMealsDay = async () => {
    setIsLoading(true);

    try {
      if (!user?.preferences?.mealsTime) {
        throw new Error('something went wrong');
      }

      const mealsDay = await new CreateMealsDayUseCase().execute(
        user.preferences.mealsTime,
      );

      if (mealsDay) {
        throw new Error('something went wrong');
      }

      setMealDayList(mealsDay);
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
    }
  };

  const updateMeal = async (updatedMeal: Partial<MealProps>) => {
    setIsLoading(true);
    showLoader();

    try {
      if (!updatedMeal.doc) {
        throw new Error('something went wrong');
      }

      await new UpdateMealUseCase().execute(updatedMeal);

      await fetchMealsDay();
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
      hideLoarder();
    }
  };

  const removeMeal = async (doc: string) => {
    setIsLoading(true);
    showLoader();

    try {
      await new RemoveMealUseCase().execute(doc);
      await fetchMealsDay();
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
      hideLoarder();
    }
  };

  const infoMeal = (meal: MealProps, info: keyof InfoFoodProps) => {
    const sum = meal.foods.reduce((acc, curr) => {
      const foodData = infoFood(curr.foodDoc);
      const measureFoodData = infoMeasure(curr.measureDoc);
      const measureMultipleGram = measureFoodData?.multiple || 0;
      const infoFoodPerGram = foodData?.info[info] || 0;
      return acc + infoFoodPerGram * measureMultipleGram * curr.quantity;
    }, 0);

    return Number(sum.toFixed(0));
  };

  const totalInfoMealsDay = (meals: MealProps[], info: keyof InfoFoodProps) => {
    const sum = meals?.reduce((acc, curr) => acc + infoMeal(curr, info), 0);
    return Number(sum.toFixed(0));
  };

  const handleInfoMeal = (meal: MealProps) => {
    const totalKcal = infoMeal(meal, 'kcalPerGram');
    const totalCarb = infoMeal(meal, 'carbPerGram');
    const totalProt = infoMeal(meal, 'protPerGram');
    const totalFat = infoMeal(meal, 'fatPerGram');
    const totalSodium = infoMeal(meal, 'sodiumPerGram');
    const totalFiber = infoMeal(meal, 'fiberPerGram');

    return {
      totalKcal,
      totalCarb,
      totalFat,
      totalProt,
      totalSodium,
      totalFiber,
    };
  };

  const handleInfoMealsDay = (meals: MealProps[]) => {
    const totalKcalMeals = totalInfoMealsDay(meals, 'kcalPerGram');
    const totalCarbMeals = totalInfoMealsDay(meals, 'carbPerGram');
    const totalProtMeals = totalInfoMealsDay(meals, 'protPerGram');
    const totalFatMeals = totalInfoMealsDay(meals, 'fatPerGram');
    const totalSodiumMeals = totalInfoMealsDay(meals, 'sodiumPerGram');
    const totalFiberMeals = totalInfoMealsDay(meals, 'fiberPerGram');

    return {
      totalKcalMeals,
      totalCarbMeals,
      totalProtMeals,
      totalFatMeals,
      totalSodiumMeals,
      totalFiberMeals,
    };
  };

  return {
    isLoading,
    createMeal,
    createMealsDay,
    fetchMeals,
    fetchMealsDay,
    updateMeal,
    removeMeal,
    handleInfoMeal,
    handleInfoMealsDay,
  };
};
