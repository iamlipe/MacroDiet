import { z } from 'zod';

const activityCreateUserSchema = z
  .object({ activityDoc: z.string() })
  .required();

export type ActivityCreateUserForm = z.infer<typeof activityCreateUserSchema>;

export default activityCreateUserSchema;
