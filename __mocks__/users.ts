import { IUser } from '@services/firebase/models/user';

interface usersData {
  data: IUser[];
}

export const users: usersData = {
  data: [
    {
      name: 'neymar',
      lastName: 'junior',
      email: 'neymar@email.com',
      photo: null,
      phone: null,
      info: {
        height: { quantity: 170, measureId: '1' },
        weigth: { quantity: 170, measureId: '1' },
        birthDate: { milliseconds: 0, nanoseconds: 0 },
        activityId: '2',
        goalId: '1',
        genderId: '1',
      },
      preferences: {
        mealsTime: [
          { title: 'Cafe da manha', time: { hour: 8, minutes: 30 } },
          { title: 'Almoço', time: { hour: 12, minutes: 30 } },
          { title: 'Cafe da tarde', time: { hour: 17, minutes: 30 } },
          { title: 'Janta', time: { hour: 21, minutes: 0 } },
        ],
        favoritesFoods: ['001', '004', '008', '013', '006', '010'],
        notifications: {
          receiveNotifiicationsMeals: true,
          reciveNotificationsDrinkWatter: false,
        },
      },
    },
  ],
};
