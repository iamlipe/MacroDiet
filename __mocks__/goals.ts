import { IGoal } from '@services/firebase/models/goal';

interface GoalsData {
  data: IGoal[];
}

export const goals: GoalsData = {
  data: [
    {
      doc: '1',
      title: 'gain',
      factor: 0.8,
    },
    {
      doc: '2',
      title: 'maintain',
      factor: 1,
    },
    {
      doc: '3',
      title: 'lose',
      factor: 1.2,
    },
  ],
};
