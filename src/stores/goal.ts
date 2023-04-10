import { IGoal } from '@services/firebase/models/goal';
import { create } from 'zustand';

type State = {
  goals: IGoal[] | null;
  setGoals: (goals: IGoal[]) => void;
};

const useGoalStore = create<State>(set => ({
  goals: null,
  setGoals: (goals: IGoal[]) => set(() => ({ goals })),
}));

export default useGoalStore;
