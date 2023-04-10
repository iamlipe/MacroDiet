export interface IInfoFood {
  kcalPerGram: number;
  protPerGram: number;
  carbPerGram: number;
  saturatedFatPerGram?: number;
  transFatPerGram?: number;
  fatPerGram: number;
  sodiumPerGram?: number;
  fiberPerGram?: number;
}

export interface IFood {
  doc?: string;
  name: string;
  brand?: string;
  measures?: Array<string>;
  info: IInfoFood;
}

export class Food implements Omit<IFood, 'doc'> {
  public name: string;
  public brand: string;
  public measures?: Array<string>;
  public info: IInfoFood;

  constructor(meal: Omit<IFood, 'doc'>) {
    this.name = meal.name.trim();
    this.brand = meal.brand.trim();
    this.measures = meal.measures;
    this.info = meal.info;
  }
}

export const buildSchemaFood = () => {};
