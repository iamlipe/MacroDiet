import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface InfoFoodProps {
  kcalPerGram: number;
  protPerGram: number;
  carbPerGram: number;
  saturatedFatPerGram?: number;
  transFatPerGram?: number;
  fatPerGram: number;
  sodiumPerGram?: number;
  fiberPerGram?: number;
}

export interface FoodProps {
  doc: string;
  name: string;
  brand?: string;
  measures?: Array<string>;
  info: InfoFoodProps;
}

export class Food implements Omit<FoodProps, 'doc'> {
  public name: string;
  public brand?: string;
  public measures?: Array<string>;
  public info: InfoFoodProps;

  constructor(meal: Omit<FoodProps, 'doc'>) {
    this.name = meal.name;
    this.brand = meal.brand;
    this.measures = meal.measures;
    this.info = meal.info;
  }
}

export const buildSchemaFood = (
  raw: FirebaseFirestoreTypes.DocumentData,
): FoodProps => {
  return {
    doc: raw.doc,
    name: raw.name,
    brand: raw.brand,
    measures: raw.measures,
    info: raw.info,
  };
};
