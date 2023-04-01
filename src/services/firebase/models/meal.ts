export interface IFoodMeal {
  foodId: string;
  measureId: string;
  quantity: number;
}

export interface IMeal {
  id: string;
  userId: string;
  title: string;
  time: { nanoseconds: number; milliseconds: number };
  foods: IFoodMeal[];
}

export const buildSchemaMeal = () => {};

export class Meal implements IMeal {
  public id: string;
  public userId: string;
  public title: string;
  public time: { nanoseconds: number; milliseconds: number };
  public foods: { foodId: string; measureId: string; quantity: number }[];

  constructor(meal: IMeal) {
    this.id = meal.id;
    this.userId = meal.userId;
    this.title = meal.title;
    this.time = meal.time;
    this.foods = meal.foods;
  }
}
