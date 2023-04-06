import { IFoodMeal } from '@services/firebase/models/meal';
import { useFoodStore } from '@stores/food';
import { useCallback, useState } from 'react';
import { useMeasures } from './useMeasures';
import { useHandleError } from './useHandleError';
import firestore from '@react-native-firebase/firestore';
import { Food, IFood } from '@services/firebase/models/food';
import { useMeasureStore } from '@stores/measure';
import { parseNumber } from '@utils/numberFormat';

interface CreateFoodDTO {
  name: string;
  brand?: string;
  portionName?: string;
  portion: string;
  carb: string;
  prot: string;
  fiber?: string;
  sodium?: string;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
}

interface ComputeKcalPerGramProps {
  carb: number;
  prot: number;
  totalFat: number;
  portion: number;
}

interface ComputeNutrientPerGramProps {
  nutrient: string;
  portion: string;
}

export const useFoods = () => {
  const [loading, setLoading] = useState(false);
  const { setFoods, foods: foodsInStore } = useFoodStore();
  const { getMeasure, createMeasure } = useMeasures();
  const { handleFirestoreError } = useHandleError();
  const { measureMassDefault } = useMeasureStore();

  const computeKcalPerGram = ({
    carb,
    prot,
    totalFat,
    portion,
  }: ComputeKcalPerGramProps): number => {
    return (carb * 4 + prot * 4 + totalFat * 9) / portion;
  };

  const computeNutrientPerGram = ({
    nutrient,
    portion,
  }: ComputeNutrientPerGramProps): number => {
    return parseNumber(nutrient) / parseNumber(portion);
  };

  const getFoods = useCallback(async () => {
    try {
      setLoading(true);

      const data = await firestore().collection('Foods').limit(20).get();

      const foods: IFood[] = data.docs.map(doc => {
        const food = doc.data();

        return {
          doc: doc.id,
          info: food.info,
          name: food.name,
          brand: food.brand,
          measures: food.measures,
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

  const createFood = useCallback(
    async ({
      portionName,
      portion,
      name,
      carb,
      prot,
      saturatedFat,
      totalFat,
      transFat,
      brand,
      fiber,
      sodium,
    }: CreateFoodDTO) => {
      try {
        setLoading(true);
        let measureDoc = '';

        console.log(parseNumber(portion));

        if (portionName) {
          measureDoc = await createMeasure({
            title: portionName,
            type: 'mass',
            quantity: parseNumber(portion),
          });
        }

        const measures = measureDoc.length
          ? [measureDoc, measureMassDefault.doc]
          : [measureMassDefault.doc];

        const info = {
          carbPerGram: computeNutrientPerGram({ nutrient: carb, portion }),
          protPerGram: computeNutrientPerGram({ nutrient: prot, portion }),
          fatPerGram: computeNutrientPerGram({ nutrient: totalFat, portion }),
          fiberPerGram: computeNutrientPerGram({ nutrient: fiber, portion }),
          sodiumPerGram: parseNumber(sodium) / (parseNumber(portion) * 1000),
          kcalPerGram: computeKcalPerGram({
            carb: parseNumber(carb),
            prot: parseNumber(prot),
            totalFat: parseNumber(totalFat),
            portion: parseNumber(portion),
          }),
          saturatedFatPerGram: computeNutrientPerGram({
            nutrient: saturatedFat,
            portion,
          }),
          transFatPerGram: computeNutrientPerGram({
            nutrient: transFat,
            portion,
          }),
        };

        const newFood = new Food({ name, brand, measures, info });

        await firestore().collection('Foods').add(newFood);
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(false);
      }
    },
    [createMeasure, handleFirestoreError, measureMassDefault.doc],
  );

  const handleFood = useCallback(
    (food: IFoodMeal) => {
      const foodData = getFood(food.foodDoc);

      const measureFoodData = getMeasure(food.measureDoc);

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

  return { getFoods, getFood, handleFood, createFood, loading };
};
