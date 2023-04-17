import { z } from 'zod';

const weightCreateUserSchema = z
  .object({
    weight: z.object({
      quantity: z.string(),
      measureDoc: z.string(),
    }),
    goalWeight: z.object({
      quantity: z.string(),
      measureDoc: z.string(),
    }),
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

export type WeightCreateUserForm = z.infer<typeof weightCreateUserSchema>;

export default weightCreateUserSchema;
