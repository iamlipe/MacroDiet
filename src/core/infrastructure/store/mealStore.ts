import { create } from 'zustand';
import { MealProps } from '@/core/domain/models/Meal';

type State = {
  mealList: MealProps[] | null;
  setMealList: (meals: MealProps[]) => void;

  mealDayList: MealProps[] | null;
  setMealDayList: (meals: MealProps[]) => void;

  selectedDateMeals: string;
  setSelectedDateMeals: (selectedDateMeals: string) => void;
};

export const useMealStore = create<State>(set => ({
  mealList: null,
  setMealList: (mealList: MealProps[]) => set(() => ({ mealList })),

  mealDayList: null,
  setMealDayList: (mealDayList: MealProps[]) => set(() => ({ mealDayList })),

  selectedDateMeals: new Date().toDateString(),
  setSelectedDateMeals: (selectedDateMeals: string) =>
    set(() => ({ selectedDateMeals })),
}));
