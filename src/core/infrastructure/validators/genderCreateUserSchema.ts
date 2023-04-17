import { z } from 'zod';

const genderCreateUserSchema = z.object({ genderDoc: z.string() }).required();

export type GenderCreateUserForm = z.infer<typeof genderCreateUserSchema>;

export default genderCreateUserSchema;
