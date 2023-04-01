import { IAcitivity } from '@services/firebase/models/acitivity';

interface AcitivitiesData {
  data: IAcitivity[];
}

export const activities: AcitivitiesData = {
  data: [
    {
      id: '1',
      title: 'leve',
      factor: 1.55,
    },
    {
      id: '2',
      title: 'moderado',
      factor: 1.84,
    },
    {
      id: '3',
      title: 'intenso',
      factor: 2.2,
    },
  ],
};
