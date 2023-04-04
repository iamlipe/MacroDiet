import { IFood } from '../models/food';
import firestore from '@react-native-firebase/firestore';

export type CreateFoodDTO = {
  food: Omit<IFood, 'id'>;
};

export const createFood = async ({ food }: CreateFoodDTO) => {
  await firestore().collection('Foods').add(food);
};

export const getFoods = async () => {
  const data = await firestore().collection('Foods').limit(20).get();

  const foods = data.docs.map(doc => {
    const food = doc.data();

    return {
      doc: doc.id,
      info: food.info,
      name: food.name,
    };
  });

  return { foods };
};
