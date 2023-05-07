import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';
import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { MealTime, MealTimeProps } from '@/core/domain/models/MealTime';

export class CreateMealTimeUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute({
    daysWeek,
    time,
    title,
  }: Omit<MealTimeProps, 'isActive' | 'doc' | 'userDoc'>) {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    const newMealTime = new MealTime({
      userDoc: auth.uid,
      title,
      time,
      daysWeek,
      isActive: true,
    });

    await this.firestoreRepository.add(
      firestoreColections.mealTimes,
      newMealTime,
    );
  }
}
