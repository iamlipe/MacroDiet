import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { useMealStore } from '@stores/index';
import { IMeal, Meal } from '@services/firebase/models/meal';
import { IFood, IInfoFood } from '@services/firebase/models/food';
import { IMealTime, IUser } from '@services/firebase/models/user';
import useFoods from './useFoods';
import useHandleError from './useHandleError';
import useMeasures from './useMeasures';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export interface ICreateMeal {
  time: { hour: number; minutes: number };
  title: string;
}

export interface IUpdateMeal {
  doc: string;
  updatedMeal: Partial<IMeal>;
}

export interface IGetMeals {
  user: Partial<IUser>;
  userDoc: string;
}

export interface IGetInfoMeal {
  meal: IMeal;
  info: keyof IInfoFood;
}

export interface IGetTotalInfoMealsDay {
  meals: IMeal[];
  info: keyof IInfoFood;
}

const useMeals = () => {
  const [loading, setLoading] = useState(false);
  const { setMeals } = useMealStore();
  const { getFood } = useFoods();
  const { getMeasure } = useMeasures();
  const { navigate: navigateDiet } = useNavigation<NavPropsDiet>();
  const { handleFirestoreError } = useHandleError();

  const createMeal = useCallback(
    async ({ time, title }: ICreateMeal) => {
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

        const batch = firestore().batch();

        const meals = mealsTime.map(({ time, title }) => {
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

          const docRef = firestore().collection('Meals').doc();

          batch.set(docRef, meal);

          return meal;
        });

        await batch.commit();
        setMeals(meals);
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(true);
      }
    },
    [handleFirestoreError, setMeals],
  );

  const getMeals = useCallback(
    async ({ user: user, userDoc }: IGetMeals) => {
      try {
        setLoading(true);

        const data = await firestore()
          .collection('Meals')
          .where('user', '==', userDoc)
          .get();

        const meals: IMeal[] = data?.docs.map(doc => {
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
        } else {
          setMeals(mealsDay);
        }
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(false);
      }
    },
    [createMealsDay, handleFirestoreError, setMeals],
  );

  const updateMeal = useCallback(
    async ({ doc, updatedMeal }: IUpdateMeal) => {
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
    measureDoc,
  }: {
    type: 'add' | 'remove' | 'edit';
    meal: IMeal;
    food: IFood;
    quantity?: number;
    measureDoc?: string;
  }) => {
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
            measureDoc,
          },
        ];
      case 'edit':
        return [
          ...meal.foods.filter(item => item.foodDoc !== food.doc),
          { foodDoc: food.doc, quantity, measureDoc },
        ];
      case 'remove':
        return [...meal.foods.filter(item => item.foodDoc !== food.doc, [])];
      default:
        return meal.foods;
    }
  };

  const getInfoMeal = useCallback(
    ({ meal, info }: IGetInfoMeal) => {
      const sum = meal.foods.reduce((acc, curr) => {
        const foodData = getFood(curr.foodDoc);
        const measureFoodData = getMeasure(curr.measureDoc);

        return (
          acc +
          (foodData?.info[info] || 0) *
            (measureFoodData?.multiple || 0) *
            curr.quantity
        );
      }, 0);

      return sum;
    },
    [getFood, getMeasure],
  );

  const getTotalInfoMealsDay = useCallback(
    ({ meals, info }: IGetTotalInfoMealsDay) => {
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
      const totalKcalMeals = Number(
        getTotalInfoMealsDay({
          meals,
          info: 'kcalPerGram',
        }).toFixed(0),
      );
      const totalCarbMeals = Number(
        getTotalInfoMealsDay({
          meals,
          info: 'carbPerGram',
        }).toFixed(0),
      );
      const totalProtMeals = Number(
        getTotalInfoMealsDay({
          meals,
          info: 'protPerGram',
        }).toFixed(0),
      );
      const totalFatMeals = Number(
        getTotalInfoMealsDay({
          meals,
          info: 'fatPerGram',
        }).toFixed(0),
      );
      const totalSodiumMeals = Number(
        getTotalInfoMealsDay({
          meals,
          info: 'sodiumPerGram',
        }).toFixed(0),
      );
      const totalFiberMeals = Number(
        getTotalInfoMealsDay({
          meals,
          info: 'fiberPerGram',
        }).toFixed(0),
      );

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

export default useMeals;
