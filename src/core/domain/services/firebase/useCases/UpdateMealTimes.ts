import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { MealTimeProps } from '@/core/domain/models/MealTime';
import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';

export class UpdateMealTimeUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute(updateMealTime: Partial<MealTimeProps>) {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    if (!updateMealTime.doc) {
      throw new Error('Meal time doc not found');
    }

    await this.firestoreRepository.update(
      firestoreColections.mealTimes,
      updateMealTime.doc,
      {
        userDoc: auth.uid,
        title: updateMealTime.title,
        time: updateMealTime.time,
        isActive: updateMealTime.isActive,
        daysWeek: updateMealTime.daysWeek,
      },
    );
  }
}
