import { z } from 'zod';

const updateMealSchema = z
  .object({
    title: z.string(),
    time: z.string(),
  })
  .required();

export type UpdateMealForm = z.infer<typeof updateMealSchema>;

export default updateMealSchema;
