import { IMeal } from 'deprecated/services/firebase/models/meal';

interface IMealsData {
  data: Array<IMeal>;
}

export const meals: IMealsData = {
  data: [
    {
      user: '1',
      title: 'Cafe da manha',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [
        {
          foodDoc: '001',
          measureDoc: '1',
          quantity: 100,
        },
      ],
    },
    {
      user: '1',
      title: 'Almoco',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [],
    },
    {
      user: '1',
      title: 'Cafe da tarde',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [],
    },
    {
      user: '1',
      title: 'Janta',
      time: { milliseconds: 0, nanoseconds: 0 },
      foods: [],
    },
  ],
};
