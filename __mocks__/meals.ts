import { IMeal } from '@services/firebase/models/meal';

interface MealsData {
  data: IMeal[];
}

export const meals: MealsData = {
  data: [
    {
      id: '1',
      userId: '1',
      title: 'Cafe da manha',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [
        {
          foodId: '001',
          measureId: '1',
          quantity: 100,
        },
      ],
    },
    {
      id: '2',
      userId: '1',
      title: 'Almoco',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [],
    },
    {
      id: '3',
      userId: '1',
      title: 'Cafe da tarde',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [],
    },
    {
      id: '4',
      userId: '1',
      title: 'Janta',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [],
    },
  ],
};
