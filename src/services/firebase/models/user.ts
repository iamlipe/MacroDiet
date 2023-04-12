import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IInfo {
  height: { quantity: number; measureDoc: string };
  weight: { quantity: number; measureDoc: string };
  goalWeight: { quantity: number; measureDoc: string };
  birthDate: { nanoseconds: number; milliseconds: number };
  activityDoc: string;
  genderDoc: string;
  timeInWeeks: number;
}

export interface INutritionalInfo {
  kcal: number;
  prot: number;
  carb: number;
  fat: number;
  fiber: number;
  sodium: number;
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
  nutritionalInfo?: INutritionalInfo;
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
  nutritionalInfo?: INutritionalInfo;
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
    lastName: raw.displayName.split(' ').splice(1).join(' '),
    email: raw.email,
    phone: raw.phoneNumber,
    photo: raw.photoURL,
  };
};

export const buildSchemaUser = () => {};
