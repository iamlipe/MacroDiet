import { z } from 'zod';

const birthDateCreateUserSchema = z
  .object({
    birthDate: z.string(),
  })
  .required();

export type BirthDateCreateUserForm = z.infer<typeof birthDateCreateUserSchema>;

export default birthDateCreateUserSchema;
