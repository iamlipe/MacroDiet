import { z } from 'zod';

const loginSchema = z
  .object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  })
  .required();

export type LoginForm = z.infer<typeof loginSchema>;

export default loginSchema;
