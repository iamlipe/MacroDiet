import { IMeal } from '@services/firebase/models/meal';

interface MealsData {
  data: IMeal[];
}

export const meals: MealsData = {
  data: [
    {
      user: '1',
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
      user: '2',
      title: 'Almoco',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [],
    },
    {
      user: '3',
      title: 'Cafe da tarde',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [],
    },
    {
      user: '4',
      title: 'Janta',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [],
    },
  ],
};
