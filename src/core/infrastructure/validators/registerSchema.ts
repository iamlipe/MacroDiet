import { z } from 'zod';

const registerSchema = z
  .object({
    fullName: z.string().min(3, 'Please enter a valid name'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .required()
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterForm = z.infer<typeof registerSchema>;

export default registerSchema;
