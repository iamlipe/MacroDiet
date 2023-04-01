import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IInfo {
  height: { quantity: number; measureId: string };
  weigth: { quantity: number; measureId: string };
  birthDate: { nanoseconds: number; milliseconds: number };
  activityId: string;
  goalId: string;
  genderId: string;
}

export interface IMealTime {
  title: string;
  time: { hour: number; minutes: number };
}

export interface INotifications {
  receiveNotifiicationsMeals?: boolean;
  reciveNotificationsDrinkWatter?: boolean;
}

export interface IPreferences {
  mealsTime: IMealTime[];
  favoritesFoods: string[];
  notifications: INotifications;
}

export interface IUser {
  name: string;
  lastName: string;
  email: string;
  photo?: string | null;
  phone?: string | null;
  info: IInfo;
  preferences: IPreferences;
}

export interface IAuth {
  name: string;
  lastName: string;
  email: string;
  photo?: string | null;
  phone?: string | null;
}

export class User implements IUser {
  name: string;
  lastName: string;
  email: string;
  photo?: string | null | undefined;
  phone?: string | null | undefined;
  info: IInfo;
  preferences: {
    mealsTime: IMealTime[];
    favoritesFoods: string[];
    notifications: INotifications;
  };

  constructor(user: IUser) {
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.photo = user.photo;
    this.phone = user.phone;
    this.info = user.info;
    this.preferences = user.preferences;
  }
}

export const buidSchemaAuth = (raw: FirebaseAuthTypes.User): IAuth => {
  return {
    name: raw.displayName.split(' ').splice(0, 1)[0],
    lastName: raw.displayName.split(' ').join(' '),
    email: raw.email,
    phone: raw.phoneNumber,
    photo: raw.photoURL,
  };
};

export const buildSchemaUser = () => {};
