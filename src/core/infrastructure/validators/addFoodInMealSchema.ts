import { z } from 'zod';

const addFoodInMealSchema = z.object({
  food: z.object({
    quantity: z.string(),
    measureDoc: z.string(),
  }),
});

export type AddFoodInMealForm = z.infer<typeof addFoodInMealSchema>;

export default addFoodInMealSchema;
