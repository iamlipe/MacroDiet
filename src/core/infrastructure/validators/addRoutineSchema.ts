import { z } from 'zod';

const addRoutineSchema = z.object({
  daysWeek: z.array(z.number().min(0).max(6)).min(1),
  title: z.string(),
  time: z.string(),
});

export type AddRoutineForm = z.infer<typeof addRoutineSchema>;

export default addRoutineSchema;
