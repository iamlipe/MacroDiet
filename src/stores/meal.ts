import { IMeal } from '@services/firebase/models/meal';
import { create } from 'zustand';

type State = {
  meals: IMeal[] | null;
  setMeals: (meals: IMeal[]) => void;
};

export const useMealStore = create<State>(set => ({
  meals: null,
  setMeals: (meals: IMeal[]) => set(() => ({ meals })),
}));
