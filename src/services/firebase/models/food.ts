export interface IInfoFood {
  kcalPerGram: number;
  protPerGram: number;
  carbPerGram: number;
  fatPerGram: number;
  sodiumPerGram: number;
  fiberPerGram: number;
}

export interface IFood {
  id: string;
  name: string;
  info: IInfoFood;
}

export const buildSchemaFood = () => {};
