import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { useMealStore } from '@stores/meal';
import { useUserStore } from '@stores/user';
import { useMeasures } from './useMeasures';
import { useFoods } from './useFoods';
import { useHandleError } from './useHandleError';
import { IMeal, Meal } from '@services/firebase/models/meal';
import { IFood, IInfoFood } from '@services/firebase/models/food';
import { IMealTime } from '@services/firebase/models/user';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

interface CreateMealDTO {
  time: { hour: number; minutes: number };
  title: string;
}

export type UpdateMealDTO = {
  doc: string;
  updatedMeal: Partial<IMeal>;
};

interface GetInfoMeal {
  meal: IMeal;
  info: keyof IInfoFood;
}

interface GetTotalInfoMealsDay {
  meals: IMeal[];
  info: keyof IInfoFood;
}

interface HandleFoodsInMeal {
  type: 'add' | 'remove' | 'edit';
  meal: IMeal;
  food: IFood;
  quantity?: number;
  measureId?: string;
}

export const useMeals = () => {
  const [loading, setLoading] = useState(false);
  const { setMeals } = useMealStore();
  const { user } = useUserStore();
  const { getFood } = useFoods();
  const { getMeasureById } = useMeasures();
  const { navigate: navigateDiet } = useNavigation<NavPropsDiet>();
  const { handleFirestoreError } = useHandleError();

  const createMeal = useCallback(
    async ({ time, title }: CreateMealDTO) => {
      try {
        setLoading(false);

        const mealTime = new Date();
        mealTime.setHours(time.hour);
        mealTime.setMinutes(time.minutes);

        const meal = new Meal({
          user: auth().currentUser.uid,
          title,
          time: {
            milliseconds: mealTime.getTime(),
            nanoseconds: mealTime.getTime() * 1000000,
          },
          foods: [],
        });

        await firestore().collection('Meals').add(meal);
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleFirestoreError],
  );

  const createMealsDay = useCallback(
    async ({ mealsTime }: { mealsTime: IMealTime[] }) => {
      try {
        setLoading(true);

        mealsTime.map(async meal => {
          await createMeal(meal);
        });
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(true);
      }
    },
    [createMeal, handleFirestoreError],
  );

  const getMeals = useCallback(async () => {
    try {
      setLoading(true);

      if (user) {
        const data = await firestore()
          .collection('Meals')
          .where('user', '==', auth().currentUser.uid)
          .get();

        const meals: IMeal[] = data.docs.map(doc => {
          const meal = doc.data();

          return {
            doc: doc.id,
            foods: meal.foods,
            time: meal.time,
            title: meal.title,
            user: meal.user,
          };
        });

        const mealsDay = meals
          .filter(meal => {
            const currDate = new Date();
            const mealDate = new Date(meal.time.milliseconds);

            if (moment(mealDate).isSame(currDate, 'day')) {
              return meal;
            }
          })
          .sort((a, b) => a.time.milliseconds - b.time.milliseconds);

        if (!mealsDay.length) {
          await createMealsDay({ mealsTime: user.preferences.mealsTime });
        }

        setMeals(mealsDay);
      }
    } catch (error) {
      handleFirestoreError(error);
    } finally {
      setLoading(true);
    }
  }, [createMealsDay, handleFirestoreError, setMeals, user]);

  const updateMeal = useCallback(
    async ({ doc, updatedMeal }: UpdateMealDTO) => {
      try {
        setLoading(true);

        await firestore().collection('Meals').doc(doc).update(updatedMeal);

        navigateDiet('HomeDiet');
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(false);
      }
    },
    [navigateDiet, handleFirestoreError],
  );

  const removeMeal = useCallback(
    async (doc: string) => {
      try {
        setLoading(true);
        await firestore().collection('Meals').doc(doc).delete();
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleFirestoreError],
  );

  const handleFoodsInMeal = ({
    type,
    meal,
    food,
    quantity,
    measureId,
  }: HandleFoodsInMeal) => {
    switch (type) {
      case 'add':
        return [
          ...meal.foods.filter(item => item.foodDoc !== food.doc),
          {
            foodDoc: food.doc,
            quantity:
              quantity +
              (meal.foods.find(item => item.foodDoc === food.doc)?.quantity ||
                0),
            measureId,
          },
        ];
      case 'edit':
        return [
          ...meal.foods.filter(item => item.foodDoc !== food.doc),
          { foodDoc: food.doc, quantity, measureId },
        ];
      case 'remove':
        return [...meal.foods.filter(item => item.foodDoc !== food.doc, [])];
      default:
        return meal.foods;
    }
  };

  const getInfoMeal = useCallback(
    ({ meal, info }: GetInfoMeal) => {
      const sum = meal.foods.reduce((acc, curr) => {
        const foodData = getFood(curr.foodDoc);
        const measureFoodData = getMeasureById({
          measure: 'mass',
          id: curr.measureId,
        });

        return (
          acc +
          (foodData?.info[info] || 0) *
            (measureFoodData?.multiple || 0) *
            curr.quantity
        );
      }, 0);

      return sum;
    },
    [getFood, getMeasureById],
  );

  const getTotalInfoMealsDay = useCallback(
    ({ meals, info }: GetTotalInfoMealsDay) => {
      const sum = meals?.reduce(
        (acc, curr) => acc + getInfoMeal({ meal: curr, info }),
        0,
      );

      return sum;
    },
    [getInfoMeal],
  );

  const handleInfoMeal = useCallback(
    (meal: IMeal) => {
      const totalKcal = getInfoMeal({ meal, info: 'kcalPerGram' }).toFixed(0);
      const totalCarb = getInfoMeal({ meal, info: 'carbPerGram' }).toFixed(0);
      const totalProt = getInfoMeal({ meal, info: 'protPerGram' }).toFixed(0);
      const totalFat = getInfoMeal({ meal, info: 'fatPerGram' }).toFixed(0);
      const totalSodium = getInfoMeal({ meal, info: 'sodiumPerGram' }).toFixed(
        0,
      );
      const totalFiber = getInfoMeal({ meal, info: 'fiberPerGram' }).toFixed(0);

      return {
        totalKcal,
        totalCarb,
        totalFat,
        totalProt,
        totalSodium,
        totalFiber,
      };
    },
    [getInfoMeal],
  );

  const handleInfoMealsDay = useCallback(
    (meals: IMeal[]) => {
      const totalKcalMeals = getTotalInfoMealsDay({
        meals,
        info: 'kcalPerGram',
      }).toFixed(0);
      const totalCarbMeals = getTotalInfoMealsDay({
        meals,
        info: 'carbPerGram',
      }).toFixed(0);
      const totalProtMeals = getTotalInfoMealsDay({
        meals,
        info: 'protPerGram',
      }).toFixed(0);
      const totalFatMeals = getTotalInfoMealsDay({
        meals,
        info: 'fatPerGram',
      }).toFixed(0);
      const totalSodiumMeals = getTotalInfoMealsDay({
        meals,
        info: 'sodiumPerGram',
      }).toFixed(0);
      const totalFiberMeals = getTotalInfoMealsDay({
        meals,
        info: 'fiberPerGram',
      }).toFixed(0);

      return {
        totalKcalMeals,
        totalCarbMeals,
        totalProtMeals,
        totalFatMeals,
        totalSodiumMeals,
        totalFiberMeals,
      };
    },
    [getTotalInfoMealsDay],
  );

  return {
    getMeals,
    createMealsDay,
    handleInfoMeal,
    handleInfoMealsDay,
    updateMeal,
    createMeal,
    removeMeal,
    handleFoodsInMeal,
    loading,
  };
};
