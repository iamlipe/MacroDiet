import { IGender } from '@services/firebase/models/gender';
import { create } from 'zustand';

type State = {
  gender: IGender[] | null;
  setGender: (goals: IGender[]) => void;
};

export const useGenderStore = create<State>(set => ({
  gender: null,
  setGender: (gender: IGender[]) => set(() => ({ gender })),
}));
