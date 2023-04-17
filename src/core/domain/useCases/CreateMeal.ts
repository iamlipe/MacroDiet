import { FirebaseAuthRepository } from '@core/data/repositories/FirebaseAuthRepository';
import { FirestoreRepository } from '@core/data/repositories/FirestoreRepository';
import { Meal } from '@core/domain/models/Meal';
import { firestoreColections } from '@utils/constants/firestoreCollections';

interface CreateMealDTO {
  title: string;
  time: { milliseconds: number; nanoseconds: number };
}

export class CreateMealUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute({ time, title }: CreateMealDTO) {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    const newMeal = new Meal({
      userDoc: auth.uid,
      title,
      time,
      foods: [],
    });

    await this.firestoreRepository.add(firestoreColections.meals, newMeal);
  }
}
