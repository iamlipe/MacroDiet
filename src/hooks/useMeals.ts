import { meals as mealsData } from '@__mocks__/meals';
import { useNavigation } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { IFood, IInfoFood } from '@services/firebase/models/food';
import { IMeal, Meal } from '@services/firebase/models/meal';
import { IMealTime } from '@services/firebase/models/user';
import { useMealStore } from '@stores/meal';
import { useUserStore } from '@stores/user';
import moment from 'moment';
import * as Yup from 'yup';

import { useFoods } from './useFoods';
import { useMeasures } from './useMeasures';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useToast } from './useToast';

interface UseMealsProps {
  shouldUpdateStore?: boolean;
}

interface CreateMealsDayProps {
  userId: string;
  mealsTime: IMealTime[];
}

interface GetInfoMeal {
  meal: IMeal;
  info: keyof IInfoFood;
}

interface GetTotalInfoMealsDay {
  meals: IMeal[];
  info: keyof IInfoFood;
}

interface UpdateMeal {
  type: 'add' | 'remove';
  meal: IMeal;
  food: IFood;
  quantity?: number;
  measureId?: string;
}

export const useMeals = ({ shouldUpdateStore = false }: UseMealsProps) => {
  const [loading, setLoading] = useState(false);
  const { setMeals, meals: mealListStore } = useMealStore();
  const { user } = useUserStore();
  const { getFoodById } = useFoods({ shouldUpdateStore: false });
  const { getMeasureById } = useMeasures({ shouldUpdateStore: false });
  const { show: showToast } = useToast();
  const { navigate: navigateDiet } = useNavigation<NavPropsDiet>();

  const getMeals = useCallback(async () => {
    try {
      setLoading(true);

      if (user) {
        const mealsDay = mealsData.data
          .filter(meal => meal.userId === user.id)
          .filter(meal => moment(new Date(meal.time.milliseconds)));

        setMeals(mealsDay);
      }
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(true);
    }
  }, [setMeals, showToast, user]);

  const createMealsDay = useCallback(
    ({ userId, mealsTime }: CreateMealsDayProps) => {
      try {
        setLoading(true);

        const createdMeals = mealsTime.map(meal => {
          const date = new Date();
          date.setHours(meal.time.hour);
          date.setMinutes(meal.time.minutes);

          return new Meal({
            id: '1',
            userId,
            title: meal.title,
            time: {
              milliseconds: date.getMilliseconds(),
              nanoseconds: date.getMilliseconds() * 1000000,
            },
            foods: [],
          });
        });

        setMeals(createdMeals);
      } catch (error) {
        showToast({ type: 'error', message: 'something went wrong' });
      } finally {
        setLoading(true);
      }
    },
    [setMeals, showToast],
  );

  const createMeal = useCallback(() => {}, []);

  const deleteMeal = useCallback(() => {}, []);

  const initialValuesAddFoodInMeal = useMemo(() => {
    return {
      food: {
        quantity: '',
        measureId: '',
      },
    };
  }, []);

  const addFoodInMealSchema = useMemo(
    () =>
      Yup.object().shape({
        food: Yup.object().shape({
          quantity: Yup.string().required(),
          measureId: Yup.string().required(),
        }),
      }),
    [],
  );

  const updateMeal = useCallback(
    ({ type, meal, food, quantity, measureId }: UpdateMeal) => {
      try {
        setLoading(true);

        if (mealListStore) {
          if (type === 'add' && quantity && measureId) {
            setMeals([
              ...mealListStore.filter(item => item.id !== meal.id),
              {
                ...meal,
                foods: [
                  ...meal.foods,
                  { foodId: food.id, quantity, measureId },
                ],
              },
            ]);
          } else if (type === 'remove') {
            setMeals([
              ...mealListStore.filter(item => item.id !== meal.id),
              {
                ...meal,
                foods: [
                  ...meal.foods.filter(item => item.foodId !== food.id, []),
                ],
              },
            ]);
          }

          navigateDiet('HomeDiet');
        }
      } catch (error) {
        showToast({ type: 'error', message: 'something went wrong' });
      } finally {
        setLoading(false);
      }
    },
    [mealListStore, navigateDiet, setMeals, showToast],
  );

  const getInfoMeal = useCallback(
    ({ meal, info }: GetInfoMeal) => {
      const sum = meal.foods.reduce((acc, curr) => {
        const foodData = getFoodById(curr.foodId);
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
    [getFoodById, getMeasureById],
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

  useEffect(() => {
    if (shouldUpdateStore) {
      getMeals();
    }
  }, [getMeals, shouldUpdateStore]);

  return {
    getMeals,
    createMealsDay,
    handleInfoMeal,
    handleInfoMealsDay,
    updateMeal,
    deleteMeal,
    createMeal,
    addFoodInMealSchema,
    initialValuesAddFoodInMeal,
    loading,
  };
};
