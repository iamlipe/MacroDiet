import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { IMeal } from '../models/meal';

export type CreateMealDTO = {
  meal: IMeal;
};

export const createMeal = async ({ meal }: CreateMealDTO) => {
  const { mealsDay } = await getMealsDay(auth().currentUser.uid);

  if (!mealsDay.length) {
    await firestore().collection('Meals').add(meal);
  }
};

export const getMealsDay = async (user: string) => {
  const data = await firestore()
    .collection('Meals')
    .where('user', '==', user)
    .get();

  const meals: IMeal[] = data.docs.map(item => {
    const meal = item.data();

    return {
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

  return { mealsDay };
};
