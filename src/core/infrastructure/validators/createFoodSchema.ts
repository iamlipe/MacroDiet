import { z } from 'zod';

const createFoodSchema = z.object({
  name: z.string().nonempty({ message: 'O nome é obrigatório.' }),
  portion: z.string().nonempty({ message: 'A porção é obrigatória.' }),
  carb: z.string().nonempty({ message: 'Os carboidratos são obrigatórios.' }),
  prot: z.string().nonempty({ message: 'As proteínas são obrigatórias.' }),
  totalFat: z.string().nonempty({ message: 'A gordura total é obrigatória.' }),
  saturatedFat: z
    .string()
    .nonempty({ message: 'A gordura saturada é obrigatória.' }),
  transFat: z.string().nonempty({ message: 'A gordura trans é obrigatória.' }),
  brand: z.string().optional(),
  portionName: z.string().optional(),
  fiber: z.string().optional(),
  sodium: z.string().optional(),
});

export type CreateFoodForm = z.infer<typeof createFoodSchema>;

export default createFoodSchema;
