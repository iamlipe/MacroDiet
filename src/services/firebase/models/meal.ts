export interface IFoodMeal {
  foodId: string;
  measureId: string;
  quantity: number;
}

export interface IMeal {
  user: string;
  title: string;
  time: { nanoseconds: number; milliseconds: number };
  foods: IFoodMeal[];
}

export const buildSchemaMeal = () => {};

export class Meal implements IMeal {
  public user: string;
  public title: string;
  public time: { nanoseconds: number; milliseconds: number };
  public foods: { foodId: string; measureId: string; quantity: number }[];

  constructor(meal: IMeal) {
    this.user = meal.user;
    this.title = meal.title;
    this.time = meal.time;
    this.foods = meal.foods;
  }
}
