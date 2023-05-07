import { useState } from 'react';
import { Meal, MealProps } from '@/core/domain/models/Meal';
import { InfoFoodProps } from '@/core/domain/models/Food';
import { MealTimeProps } from '@/core/domain/models/MealTime';
import { GetMealsUseCase } from '@/core/domain/services/firebase/useCases/GetMeals';
import { GetMealsDayUseCase } from '@/core/domain/services/firebase/useCases/GetMealsDay';
import { GetAuthUseCase } from '@/core/domain/services/firebase/useCases/GetAuth';
import { CreateMealsDayUseCase } from '@/core/domain/services/firebase/useCases/CreateMealsDay';
import { UpdateMealUseCase } from '@/core/domain/services/firebase/useCases/UpdateMeal';
import { RemoveMealUseCase } from '@/core/domain/services/firebase/useCases/RemoveMeal';
import { CreateMealUseCase } from '@/core/domain/services/firebase/useCases/CreateMeal';
import { CreateMealForm } from '@/core/infrastructure/validators/createMealSchema';
import { useMealStore } from '@/core/infrastructure/store/mealStore';
import { useToast } from '@/core/infrastructure/hooks/useToast';
import { useFood } from '@/core/infrastructure/hooks/useFood';
import { useMeasure } from '@/core/infrastructure/hooks/useMeasure';
import { useLoader } from '@/core/infrastructure/hooks/useLoader';
import { useMealTime } from '@/core/infrastructure/hooks/useMealTime';
import { LastMealsDayCreatedCache } from '@/core/domain/cache/LastMealsDayCreated';
import moment from 'moment';

export const useMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setMealList, setMealDayList, selectedDateMeals } = useMealStore();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoarder } = useLoader();
  const { infoMeasure } = useMeasure();
  const { infoFood } = useFood();
  const { fetchMealTimes } = useMealTime();

  const checkAlreadyCreatedMealsToday = async () => {
    const lastMealsDayCreated = await new LastMealsDayCreatedCache().read();

    if (!lastMealsDayCreated) return false;

    const dateLastTimeUpdate = moment(lastMealsDayCreated);
    const oneDayAgo = moment().subtract(1, 'days');

    return !dateLastTimeUpdate.isBefore(oneDayAgo);
  };

  const fetchMealsDay = async () => {
    setIsLoading(true);

    try {
      const mealTimes = await fetchMealTimes();

      const mealsDay = await new GetMealsDayUseCase().execute(
        selectedDateMeals,
      );

      const alreadyCreatedMealsToday = await checkAlreadyCreatedMealsToday();

      if (
        !mealsDay.length &&
        !!mealTimes?.length &&
        !alreadyCreatedMealsToday
      ) {
        await createMealsDay(mealTimes);
      } else {
        setMealDayList(mealsDay);
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
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
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createMeal = async (values: CreateMealForm) => {
    setIsLoading(true);
    showLoader();

    try {
      const date = new Date(selectedDateMeals);
      const dateMeal = new Date(values.mealTime);

      date.setHours(dateMeal.getHours());
      date.setMinutes(dateMeal.getMinutes());

      await new CreateMealUseCase().execute({
        title: values.title,
        time: {
          milliseconds: date.getTime(),
          nanoseconds: date.getTime() * 1000000,
        },
      });

      await fetchMealsDay();
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
      hideLoarder();
    }
  };

  const createMealsDay = async (mealTimes: MealTimeProps[]) => {
    setIsLoading(true);

    try {
      const auth = await new GetAuthUseCase().execute();

      const meals = mealTimes
        .filter(item => item.isActive)
        .map(({ time, title }) => {
          const mealTime = new Date();
          mealTime.setHours(time.hours);
          mealTime.setMinutes(time.minutes);

          return new Meal({
            userDoc: auth.uid,
            title,
            time: {
              milliseconds: mealTime.getTime(),
              nanoseconds: mealTime.getTime() * 1000000,
            },
            foods: [],
          });
        });

      await new CreateMealsDayUseCase().execute(meals);

      await new LastMealsDayCreatedCache().save(new Date().toDateString());

      const mealsDay = await new GetMealsDayUseCase().execute(
        selectedDateMeals,
      );

      setMealDayList(mealsDay);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
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
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
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
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
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
