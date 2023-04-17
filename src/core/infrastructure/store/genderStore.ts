import { GenderProps } from '@core/domain/models/Gender';
import { create } from 'zustand';

type State = {
  genderList: GenderProps[] | null;
  setGenderList: (genders: GenderProps[]) => void;
};

export const useGenderStore = create<State>(set => ({
  genderList: null,
  setGenderList: (genderList: GenderProps[]) => set(() => ({ genderList })),
}));
