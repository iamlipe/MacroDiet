import { z } from 'zod';

const updateUserInfoSchema = z.object({
  name: z.string().min(3, { message: 'Digite um nome valido' }),
  email: z.string().email({ message: 'Digite um e-mail valido' }),
});

export type UpdateUserInfoForm = z.infer<typeof updateUserInfoSchema>;

export default updateUserInfoSchema;
