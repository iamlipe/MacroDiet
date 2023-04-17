import { z } from 'zod';

const heightCreateUserSchema = z
  .object({
    height: z.object({
      quantity: z.string(),
      measureDoc: z.string(),
    }),
  })
  .required();

export type HeightCreateUserForm = z.infer<typeof heightCreateUserSchema>;

export default heightCreateUserSchema;
