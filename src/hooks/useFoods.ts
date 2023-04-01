import { foods as dataFoods } from '@__mocks__/foods';
import { IFoodMeal } from '@services/firebase/models/meal';
import { useFoodStore } from '@stores/food';
import { useCallback, useEffect, useState } from 'react';

import { useMeasures } from './useMeasures';
import { useToast } from './useToast';

interface UseFoodsProps {
  shouldUpdateStore?: boolean;
}

export const useFoods = ({ shouldUpdateStore = false }: UseFoodsProps) => {
  const [loading, setLoading] = useState(false);
  const { setFoods } = useFoodStore();
  const { show: showToast } = useToast();
  const { getMeasureById } = useMeasures({ shouldUpdateStore: false });

  const getFoods = useCallback(async () => {
    try {
      setLoading(true);
      setFoods(dataFoods.data);
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(false);
    }
  }, [setFoods, showToast]);

  const getFoodById = useCallback((id: string) => {
    return dataFoods.data.find(food => food.id === id);
  }, []);

  const handleFood = useCallback(
    (food: IFoodMeal) => {
      const foodData = getFoodById(food.foodId);
      const measureFoodData = getMeasureById({
        measure: 'mass',
        id: food.measureId,
      });

      const title = foodData?.name || '';
      const kcal = `${
        food.quantity *
        (measureFoodData?.multiple || 1) *
        (foodData?.info.kcalPerGram || 1)
      }kcal`;
      const quantity = `${food.quantity * (measureFoodData?.multiple || 1)}g`;

      return { title, kcal, quantity };
    },
    [getFoodById, getMeasureById],
  );

  useEffect(() => {
    if (shouldUpdateStore) {
      getFoods();
    }
  }, [getFoods, shouldUpdateStore]);

  return { getFoods, getFoodById, handleFood, loading };
};
