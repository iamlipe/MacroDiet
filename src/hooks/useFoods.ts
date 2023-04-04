import { IFoodMeal } from '@services/firebase/models/meal';
import { useFoodStore } from '@stores/food';
import { useCallback, useState } from 'react';
import { useMeasures } from './useMeasures';
import { getFoods as getFoodFirebase } from '@services/firebase/repositories/foods';
import { useHandleError } from './useHandleError';

export const useFoods = () => {
  const [loading, setLoading] = useState(false);
  const { setFoods, foods } = useFoodStore();
  const { getMeasureById } = useMeasures();
  const { handleFirestoreError } = useHandleError();

  const getFoods = useCallback(async () => {
    try {
      setLoading(true);

      const { foods: queryFoods } = await getFoodFirebase();
      setFoods(queryFoods);
    } catch (error) {
      handleFirestoreError(error);
    } finally {
      setLoading(false);
    }
  }, [handleFirestoreError, setFoods]);

  const getFood = useCallback(
    (doc: string) => {
      return foods.find(food => food.doc === doc);
    },
    [foods],
  );

  const handleFood = useCallback(
    (food: IFoodMeal) => {
      const foodData = getFood(food.foodDoc);

      const measureFoodData = getMeasureById({
        measure: 'mass',
        id: food.measureId,
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
    [getFood, getMeasureById],
  );

  return { getFoods, getFood, handleFood, loading };
};
