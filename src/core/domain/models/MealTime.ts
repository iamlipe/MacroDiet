import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface MealTimeProps {
  doc: string;
  userDoc: string;
  title: string;
  time: { hours: number; minutes: number };
  isActive: boolean;
  daysWeek: number[];
}

export class MealTime implements Omit<MealTimeProps, 'doc'> {
  public userDoc: string;
  public title: string;
  public time: { hours: number; minutes: number };
  public isActive: boolean;
  public daysWeek: number[];

  constructor(meal: Omit<MealTimeProps, 'doc'>) {
    this.userDoc = meal.userDoc;
    this.title = meal.title;
    this.time = meal.time;
    this.isActive = meal.isActive;
    this.daysWeek = meal.daysWeek;
  }
}

export const buildSchemaMealTime = (
  raw: FirebaseFirestoreTypes.DocumentData,
): MealTimeProps => {
  return {
    doc: raw.doc,
    userDoc: raw.userDoc,
    title: raw.title,
    time: raw.time,
    isActive: raw.isActive,
    daysWeek: raw.daysWeek,
  };
};
