import { IGoal } from '@services/firebase/models/goal';

interface IGoalsData {
  data: Array<IGoal>;
}

export const goals: IGoalsData = {
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
