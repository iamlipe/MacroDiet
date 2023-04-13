import { useCallback, useState } from 'react';
import { IFoodMeal } from '@services/firebase/models/meal';
import { Food, IFood } from '@services/firebase/models/food';
import { useMeasureStore, useFoodStore, useUserStore } from '@stores/index';
import { parseNumber } from '@utils/numberFormat';
import useMeasures from './useMeasures';
import useHandleError from './useHandleError';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type CreateFoodDTO = {
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
};

interface IComputeNutrientPerGram {
  nutrient: string;
  portion: string;
}

const useFoods = () => {
  const [loading, setLoading] = useState(false);
  const {
    setFoods,
    foods: foodsInStore,
    setFavoriteFoods: setFavoriteFoodsInFoodStore,
  } = useFoodStore();
  const { getMeasure, createMeasure } = useMeasures();
  const { handleFirestoreError } = useHandleError();
  const { measureMassDefault } = useMeasureStore();
  const { user, setFavoritesFoods: setFavoritesFoodsInUser } = useUserStore();

  const computeKcalPerGram = ({
    carb,
    prot,
    totalFat,
    portion,
  }: {
    carb: number;
    prot: number;
    totalFat: number;
    portion: number;
  }): number => {
    return (carb * 4 + prot * 4 + totalFat * 9) / portion;
  };

  const computeNutrientPerGram = ({
    nutrient,
    portion,
  }: IComputeNutrientPerGram): number => {
    return parseNumber(nutrient) / parseNumber(portion);
  };

  const getFavoritesFood = async () => {
    try {
      setLoading(true);

      const data = await firestore().collection('Foods').get();

      let favoriteFoods = [];

      user.preferences.favoritesFoods.forEach(foodDoc => {
        const food = data.docs.find(item => item.id === foodDoc).data();

        if (food) {
          favoriteFoods.push({
            doc: foodDoc,
            info: food.info,
            name: food.name,
            brand: food.brand,
            measures: food.measures,
          });
        }
      });

      setFavoriteFoodsInFoodStore(favoriteFoods);
    } catch (error) {
      handleFirestoreError(error);
    } finally {
      setLoading(false);
    }
  };

  const getFoods = useCallback(async () => {
    try {
      setLoading(true);

      const data = await firestore()
        .collection('Foods')
        .orderBy('name')
        .limit(20)
        .get();

      const foods: IFood[] = data.docs
        .filter(
          doc => !user.preferences.favoritesFoods.some(item => item === doc.id),
        )
        .map(doc => {
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
  }, [handleFirestoreError, setFoods, user.preferences.favoritesFoods]);

  const getFood = useCallback(
    (doc: string) => {
      return foodsInStore?.find(food => food.doc === doc);
    },
    [foodsInStore],
  );

  const updateFavoritesFoods = useCallback(
    async (foodDoc: string) => {
      try {
        setLoading(true);

        const isFavorited = user.preferences.favoritesFoods.includes(foodDoc);

        const favorites = isFavorited
          ? user.preferences.favoritesFoods.filter(food => food !== foodDoc)
          : [...user.preferences.favoritesFoods, foodDoc];

        await firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update({
            'preferences.favoritesFoods': favorites,
          });

        setFavoritesFoodsInUser(favorites);
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(false);
      }
    },
    [
      handleFirestoreError,
      setFavoritesFoodsInUser,
      user.preferences.favoritesFoods,
    ],
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

  return {
    getFoods,
    getFavoritesFood,
    getFood,
    handleFood,
    createFood,
    updateFavoritesFoods,
    loading,
  };
};

export default useFoods;
