import { z } from 'zod';

const updateGoalSchema = z
  .object({
    height: z.object({
      quantity: z.string().min(1, { message: 'Digite uma altura valida' }),
      measureDoc: z.string(),
    }),
    weight: z.object({
      quantity: z.string().min(1, { message: 'Digite um peso valido' }),
      measureDoc: z.string(),
    }),
    goalWeight: z.object({
      quantity: z.string().min(1, { message: 'Digite um peso valido' }),
      measureDoc: z.string(),
    }),
    activityLevel: z.string(),
    time: z.string(),
    birthDate: z.string(),
  })
  .refine(
    async value => {
      const weightQuantity = parseFloat(value.weight.quantity || '0');
      const goalWeightQuantity = parseFloat(value.goalWeight.quantity || '0');
      const maxDifference = 0.1 * weightQuantity;

      return (
        goalWeightQuantity >= weightQuantity - maxDifference &&
        goalWeightQuantity <= weightQuantity + maxDifference
      );
    },
    {
      message: 'Your goal weight should be realistic and achievable',
      path: ['goalWeight.quantity'],
    },
  );

export type UpdateGoalForm = z.infer<typeof updateGoalSchema>;

export default updateGoalSchema;
