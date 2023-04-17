import { z } from 'zod';

const timeCreateUserSchema = z.object({ timeInWeeks: z.string() }).required();

export type TimeCreateUserForm = z.infer<typeof timeCreateUserSchema>;

export default timeCreateUserSchema;
