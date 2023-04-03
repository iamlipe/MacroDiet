import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { IFood, IInfoFood } from '@services/firebase/models/food';
import { IMeal, Meal } from '@services/firebase/models/meal';
import { useMealStore } from '@stores/meal';
import { useUserStore } from '@stores/user';
import {
  createMeal as createMealFirebase,
  getMealsDay,
} from '@services/firebase/repositories/meals';
import { useFoods } from './useFoods';
import { useMeasures } from './useMeasures';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from './useToast';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import { IMealTime } from '@services/firebase/models/user';

interface CreateMealProps {
  time: { hour: number; minutes: number };
  title: string;
}

interface UseMealsProps {
  shouldUpdateStore?: boolean;
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
  const isFocused = useIsFocused();

  const getMeals = useCallback(async () => {
    try {
      setLoading(true);

      if (user) {
        const { mealsDay } = await getMealsDay(auth().currentUser.uid);
        setMeals(mealsDay);
      }
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(true);
    }
  }, [setMeals, showToast, user]);

  const initialValuesCreateMeal = useMemo(() => {
    return {
      mealTime: '',
      title: '',
    };
  }, []);

  const createMealSchema = useMemo(
    () =>
      Yup.object().shape({
        mealTime: Yup.string().required(
          'Escolha um horario para esse refeição',
        ),
        title: Yup.string().required('Por favor, digite o nome da refeição'),
      }),
    [],
  );

  const createMeal = useCallback(async ({ time, title }: CreateMealProps) => {
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

    await createMealFirebase({ meal });
  }, []);

  const createMealsDay = useCallback(
    async ({ mealsTime }: { mealsTime: IMealTime[] }) => {
      try {
        setLoading(true);

        const { mealsDay } = await getMealsDay(auth().currentUser.uid);

        if (!mealsDay.length) {
          mealsTime.map(async meal => {
            await createMeal(meal);
          });
        }
      } catch (error) {
        if (error.meassage) {
          showToast({ type: 'error', message: error.message });
        }

        showToast({ type: 'error', message: 'something went wrong' });
      } finally {
        setLoading(true);
      }
    },
    [createMeal, showToast],
  );

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
              // ...mealListStore.filter(item => item.id !== meal.id),
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
              // ...mealListStore.filter(item => item.id !== meal.id),
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
  }, [getMeals, shouldUpdateStore, isFocused]);

  return {
    getMeals,
    createMealsDay,
    handleInfoMeal,
    handleInfoMealsDay,
    updateMeal,
    deleteMeal,
    createMeal,
    addFoodInMealSchema,
    createMealSchema,
    initialValuesAddFoodInMeal,
    initialValuesCreateMeal,
    loading,
  };
};
