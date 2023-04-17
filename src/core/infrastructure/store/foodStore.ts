import { FoodProps } from '@core/domain/models/Food';
import { create } from 'zustand';

type State = {
  foodList: FoodProps[] | null;
  setFoodList: (foodList: FoodProps[]) => void;

  favoriteFoodList: FoodProps[] | null;
  setFavoriteFoodList: (favoriteFoodList: FoodProps[]) => void;
};

export const useFoodStore = create<State>(set => ({
  foodList: null,
  setFoodList: (foodList: FoodProps[]) => set(() => ({ foodList })),

  favoriteFoodList: null,
  setFavoriteFoodList: (favoriteFoodList: FoodProps[]) =>
    set(() => ({ favoriteFoodList })),
}));
