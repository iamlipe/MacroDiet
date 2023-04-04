export interface IFoodMeal {
  food: string;
  measureId: string;
  quantity: number;
}

export interface IMeal {
  doc: string;
  user: string;
  title: string;
  time: { nanoseconds: number; milliseconds: number };
  foods: IFoodMeal[];
}

export const buildSchemaMeal = () => {};

export class Meal implements Omit<IMeal, 'doc'> {
  public user: string;
  public title: string;
  public time: { nanoseconds: number; milliseconds: number };
  public foods: { food: string; measureId: string; quantity: number }[];

  constructor(meal: Omit<IMeal, 'doc'>) {
    this.user = meal.user;
    this.title = meal.title;
    this.time = meal.time;
    this.foods = meal.foods;
  }
}
