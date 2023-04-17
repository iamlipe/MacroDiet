import { z } from 'zod';

const recoveryPasswordSchema = z
  .object({
    email: z.string().email('Please enter a valid email'),
  })
  .required();

export type RecoveryPasswordForm = z.infer<typeof recoveryPasswordSchema>;

export default recoveryPasswordSchema;
