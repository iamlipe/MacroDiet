import { FirestoreRepository } from '@core/data/repositories/FirestoreRepository';
import { MealProps } from '../models/Meal';
import { firestoreColections } from '@utils/constants/firestoreCollections';

export class UpdateMealUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute(updateMeal: Partial<MealProps>) {
    if (!updateMeal.doc) {
      throw new Error('meal doc not found');
    }

    await this.firestoreRepository.update(
      firestoreColections.meals,
      updateMeal.doc,
      {
        userDoc: updateMeal.userDoc,
        title: updateMeal.title,
        time: updateMeal.time,
        foods: updateMeal.foods,
      },
    );
  }
}
