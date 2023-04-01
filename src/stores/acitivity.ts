import { IAcitivity } from '@services/firebase/models/acitivity';
import { create } from 'zustand';

type State = {
  acitivities: IAcitivity[] | null;
  setAcitivities: (foods: IAcitivity[]) => void;
};

export const useActivityStore = create<State>(set => ({
  acitivities: null,
  setAcitivities: (acitivities: IAcitivity[]) => set(() => ({ acitivities })),
}));
