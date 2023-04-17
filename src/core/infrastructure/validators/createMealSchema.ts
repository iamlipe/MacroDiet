import { z } from 'zod';

const createMealSchema = z
  .object({
    title: z.string(),
    mealTime: z.string(),
  })
  .required();

export type CreateMealForm = z.infer<typeof createMealSchema>;

export default createMealSchema;
