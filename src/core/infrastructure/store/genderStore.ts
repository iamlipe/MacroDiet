import { create } from 'zustand';
import { GenderProps } from '@/core/domain/models/Gender';

type State = {
  genderList: GenderProps[] | null;
  setGenderList: (genders: GenderProps[]) => void;
};

export const useGenderStore = create<State>(set => ({
  genderList: null,
  setGenderList: (genderList: GenderProps[]) => set(() => ({ genderList })),
}));
