import { create } from 'zustand';
import { ActivityProps } from '@/core/domain/models/Activity';

type State = {
  acitivityList: ActivityProps[] | null;
  setAcitivityList: (foods: ActivityProps[]) => void;
};

export const useActivityStore = create<State>(set => ({
  acitivityList: null,
  setAcitivityList: (acitivityList: ActivityProps[]) =>
    set(() => ({ acitivityList })),
}));
