import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { Food, InfoFoodProps } from '@/core/domain/models/Food';

interface CreateFoodDTO {
  info: InfoFoodProps;
  name: string;
  brand?: string;
  measures?: string[];
}

export class CreateFoodUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute(values: CreateFoodDTO) {
    const newFood = new Food({
      info: values.info,
      name: values.name,
      brand: values.brand,
      measures: values.measures,
    });

    const foodDoc = await this.firestoreRepository.add(
      firestoreColections.foods,
      newFood,
    );

    return foodDoc;
  }
}
