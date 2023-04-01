import { IFood } from '@services/firebase/models/food';
import { create } from 'zustand';

type State = {
  foods: IFood[] | null;
  setFoods: (foods: IFood[]) => void;
};

export const useFoodStore = create<State>(set => ({
  foods: null,
  setFoods: (foods: IFood[]) => set(() => ({ foods })),
}));
