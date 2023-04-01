import { IGoal } from '@services/firebase/models/goal';

interface GoalsData {
  data: IGoal[];
}

export const goals: GoalsData = {
  data: [
    {
      id: '1',
      title: 'ganhar massa',
      factor: 0,
    },
    {
      id: '2',
      title: 'manter peso',
      factor: 0,
    },
    {
      id: '3',
      title: 'emagrecer',
      factor: 0,
    },
  ],
};
