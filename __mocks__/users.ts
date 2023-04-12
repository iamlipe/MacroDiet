import { IUser } from '@services/firebase/models/user';

interface IUsersData {
  data: Array<IUser>;
}

export const defaultPreferences = {
  mealsTime: [
    { title: 'Cafe da manha', time: { hour: 8, minutes: 30 } },
    { title: 'Almoço', time: { hour: 12, minutes: 30 } },
    { title: 'Cafe da tarde', time: { hour: 17, minutes: 30 } },
    { title: 'Janta', time: { hour: 21, minutes: 0 } },
  ],
  favoritesFoods: [],
  notifications: {
    receiveNotifiicationsMeals: true,
    reciveNotificationsDrinkWatter: false,
  },
};

export const users: IUsersData = {
  data: [
    {
      name: 'neymar',
      lastName: 'junior',
      email: 'neymar@email.com',
      photo: null,
      phone: null,
      info: {
        height: { quantity: 170, measureDoc: '1' },
        weigth: { quantity: 74, measureDoc: '1' },
        birthDate: { milliseconds: 0, nanoseconds: 0 },
        activityDoc: '2',
        goalDoc: '1',
        genderDoc: '1',
        goalWeight: 76,
      },
      preferences: defaultPreferences,
    },
  ],
};
