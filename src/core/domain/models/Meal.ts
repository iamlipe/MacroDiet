import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface FoodMealProps {
  foodDoc: string;
  measureDoc: string;
  quantity: number;
}

export interface MealProps {
  doc: string;
  userDoc: string;
  title: string;
  time: { nanoseconds: number; milliseconds: number };
  foods: FoodMealProps[];
}

export class Meal implements Omit<MealProps, 'doc'> {
  public userDoc: string;
  public title: string;
  public time: { nanoseconds: number; milliseconds: number };
  public foods: { foodDoc: string; measureDoc: string; quantity: number }[];

  constructor(meal: Omit<MealProps, 'doc'>) {
    this.userDoc = meal.userDoc;
    this.title = meal.title;
    this.time = meal.time;
    this.foods = meal.foods;
  }
}

export const buildSchemaMeal = (
  raw: FirebaseFirestoreTypes.DocumentData,
): MealProps => {
  return {
    doc: raw.doc,
    title: raw.title,
    foods: raw.foods,
    time: raw.time,
    userDoc: raw.userDoc,
  };
};
