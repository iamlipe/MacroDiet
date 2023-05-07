import { useState } from 'react';
import { handleInfoFood } from '@/utils/helpers/handleFood';
import { FoodMealProps } from '@/core/domain/models/Meal';
import { FoodProps } from '@/core/domain/models/Food';
import { GetFoodsUseCase } from '@/core/domain/services/firebase/useCases/GetFoods';
import { GetSearchFoodsUseCase } from '@/core/domain/services/firebase/useCases/GetSearchFoods';
import { CreateFoodUseCase } from '@/core/domain/services/firebase/useCases/CreateFood';
import { CreateFoodForm } from '@/core/infrastructure/validators/createFoodSchema';
import { useFoodStore } from '@/core/infrastructure/store/foodStore';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useToast } from '@/core/infrastructure/hooks/useToast';
import { useMeasure } from '@/core/infrastructure/hooks/useMeasure';

export const useFood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { show: showToast } = useToast();
  const { foodList, setFavoriteFoodList, setFoodList, setSearchFoodList } =
    useFoodStore();
  const { infoMeasure, createMeasure, getMeasureMassDefault } = useMeasure();
  const { user } = useUserStore();

  const fetchFoods = async () => {
    setIsLoading(true);

    try {
      const foods = await new GetFoodsUseCase().execute();

      if (user?.preferences) {
        let favoriteFoods: FoodProps[] = [];

        user.preferences.favoritesFoods.forEach(favoriteFoodDoc => {
          const favoriteFood = foods.find(food => food.doc === favoriteFoodDoc);

          if (favoriteFood) {
            favoriteFoods.push(favoriteFood);
          }

          setFavoriteFoodList(favoriteFoods);
        });
      }

      setFoodList(foods);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchFoods = async (search: string) => {
    setIsLoading(true);

    try {
      const foods = await new GetSearchFoodsUseCase().execute(search);
      setSearchFoodList(foods);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createFood = async (values: CreateFoodForm) => {
    setIsLoading(true);

    try {
      let measureFoodDoc = '';

      if (values.portionName) {
        await createMeasure(
          {
            multiple: 12,
            title: values.portionName,
            type: 'mass',
          },
          measureDoc => (measureFoodDoc = measureDoc),
        );
      }

      const measureMassDefaultDoc = getMeasureMassDefault()?.doc;

      const measures = [measureMassDefaultDoc, measureFoodDoc].filter(
        Boolean,
      ) as string[];

      const info = handleInfoFood(values);

      await new CreateFoodUseCase().execute({
        name: values.name,
        brand: values.brand,
        info,
        measures,
      });
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const infoFood = (foodDoc: string) => {
    return foodList?.find(food => food.doc === foodDoc) || null;
  };

  const handleFood = (food: FoodMealProps) => {
    const foodData = infoFood(food.foodDoc);
    const measureFoodData = infoMeasure(food.measureDoc);

    const foodMeasureMultipleGram = measureFoodData?.multiple || 0;
    const foodKcalPerGram = foodData?.info.kcalPerGram || 1;

    const title = foodData?.name || '';
    const kcal = Number(
      (food.quantity * foodMeasureMultipleGram * foodKcalPerGram).toFixed(0),
    );
    const quantity = Number(
      (food.quantity * foodMeasureMultipleGram).toFixed(0),
    );

    return { title, kcal, quantity };
  };

  return {
    fetchFoods,
    createFood,
    infoFood,
    handleFood,
    isLoading,
    fetchSearchFoods,
  };
};
