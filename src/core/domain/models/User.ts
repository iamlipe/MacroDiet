import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { formatFullName } from '@utils/helpers/format';
import { Replace } from '@utils/helpers/help';

export interface AuthProps {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  photo?: string | null;
  phone?: string | null;
}

export interface InfoProps {
  height: { quantity: number; measureDoc: string };
  weight: { quantity: number; measureDoc: string };
  goalWeight: { quantity: number; measureDoc: string };
  birthDate: { nanoseconds: number; milliseconds: number };
  activityDoc: string;
  genderDoc: string;
  timeInWeeks: number;
}

export interface NutritionalInfoProps {
  kcal: number;
  prot: number;
  carb: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface MealTimeProps {
  title: string;
  time: { hour: number; minutes: number };
  daysWeek: Array<number>;
}

export interface NotificationsProps {
  receiveNotifiicationsMeals?: boolean;
  reciveNotificationsDrinkWatter?: boolean;
}

export interface IPreferences {
  mealsTime: MealTimeProps[];
  favoritesFoods: string[];
  notifications: NotificationsProps;
}

export interface IUser extends AuthProps {
  info: InfoProps;
  nutritionalInfo?: NutritionalInfoProps;
  preferences: IPreferences;
}

export class User implements IUser {
  firstName: string;
  lastName: string;
  email: string;
  photo?: string | null;
  phone?: string | null;
  info: InfoProps;
  preferences: IPreferences;

  constructor(
    user: Replace<
      IUser,
      { firstName: string; lastName: string; email: string }
    >,
  ) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.photo = user.photo;
    this.phone = user.phone;
    this.info = user.info;
    this.preferences = user.preferences;
  }
}

export const buidSchemaAuth = (raw: FirebaseAuthTypes.User): AuthProps => {
  return {
    firstName: formatFullName(raw.displayName || '').firstName,
    lastName: formatFullName(raw.displayName || '').lastName,
    email: raw.email ? raw.email : null,
    phone: raw.phoneNumber,
    photo: raw.photoURL,
  };
};

export const buildSchemaUser = (
  raw: FirebaseFirestoreTypes.DocumentData,
): IUser => {
  return {
    firstName: formatFullName(raw.displayName).firstName,
    lastName: formatFullName(raw.displayName).lastName,
    email: raw.email ? raw.email : null,
    phone: raw.phoneNumber,
    photo: raw.photoURL,
    info: raw.info,
    preferences: raw.preferences,
  };
};
