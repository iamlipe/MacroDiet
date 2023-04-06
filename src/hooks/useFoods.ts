import { IFoodMeal } from '@services/firebase/models/meal';
import { useFoodStore } from '@stores/food';
import { useCallback, useState } from 'react';
import { useMeasures } from './useMeasures';
import { useHandleError } from './useHandleError';
import firestore from '@react-native-firebase/firestore';

export const useFoods = () => {
  const [loading, setLoading] = useState(false);
  const { setFoods, foods: foodsInStore } = useFoodStore();
  const { getMeasure } = useMeasures();
  const { handleFirestoreError } = useHandleError();

  const getFoods = useCallback(async () => {
    try {
      setLoading(true);

      const data = await firestore().collection('Foods').limit(20).get();

      const foods = data.docs.map(doc => {
        const food = doc.data();

        return {
          doc: doc.id,
          info: food.info,
          name: food.name,
        };
      });

      setFoods(foods);
    } catch (error) {
      handleFirestoreError(error);
    } finally {
      setLoading(false);
    }
  }, [handleFirestoreError, setFoods]);

  const getFood = useCallback(
    (doc: string) => {
      return foodsInStore?.find(food => food.doc === doc);
    },
    [foodsInStore],
  );

  const handleFood = useCallback(
    (food: IFoodMeal) => {
      const foodData = getFood(food.foodDoc);

      const measureFoodData = getMeasure({
        measure: 'mass',
        doc: food.measureDoc,
      });

      const title = foodData?.name || '';

      const kcal = `${(
        food.quantity *
        (measureFoodData?.multiple || 1) *
        (foodData?.info.kcalPerGram || 1)
      ).toFixed(0)}kcal`;

      const quantity = `${food.quantity * (measureFoodData?.multiple || 1)}g`;

      return { title, kcal, quantity };
    },
    [getFood, getMeasure],
  );

  return { getFoods, getFood, handleFood, loading };
};
