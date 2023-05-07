import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { Meal } from '@/core/domain/models/Meal';
import { firestoreColections } from '@/utils/constants/firestoreCollections';

export class CreateMealsDayUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute(meals: Meal[]) {
    if (!meals.length) {
      throw new Error('Dont have meal to create');
    }

    await this.firestoreRepository.setMany(firestoreColections.meals, meals);
  }
}
