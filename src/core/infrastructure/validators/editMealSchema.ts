import { z } from 'zod';

const editMealSchema = z
  .object({
    title: z.string(),
    mealTime: z.string(),
  })
  .required();

export type EditMealForm = z.infer<typeof editMealSchema>;

export default editMealSchema;
