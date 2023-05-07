import { create } from 'zustand';
import { FoodProps } from '@/core/domain/models/Food';

type State = {
  foodList: FoodProps[] | null;
  setFoodList: (foodList: FoodProps[]) => void;

  searchFoodList: FoodProps[] | null;
  setSearchFoodList: (searchFoodList: FoodProps[]) => void;

  favoriteFoodList: FoodProps[] | null;
  setFavoriteFoodList: (favoriteFoodList: FoodProps[]) => void;
};

export const useFoodStore = create<State>(set => ({
  foodList: null,
  setFoodList: (foodList: FoodProps[]) => set(() => ({ foodList })),

  searchFoodList: null,
  setSearchFoodList: (searchFoodList: FoodProps[]) =>
    set(() => ({ searchFoodList })),

  favoriteFoodList: null,
  setFavoriteFoodList: (favoriteFoodList: FoodProps[]) =>
    set(() => ({ favoriteFoodList })),
}));
