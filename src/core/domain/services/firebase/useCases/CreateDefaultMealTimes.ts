import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { MealTime } from '@/core/domain/models/MealTime';
import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';

export class CreateDefaultMealTimesUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute() {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    const defaultMealsTime = [
      { title: 'Café da manhã', time: { hours: 7, minutes: 0 } },
      { title: 'Lanche da manhã', time: { hours: 10, minutes: 0 } },
      { title: 'Almoço', time: { hours: 13, minutes: 0 } },
      { title: 'Lanche da tarde', time: { hours: 16, minutes: 0 } },
      { title: 'Jantar', time: { hours: 20, minutes: 0 } },
    ];

    const mealTimes = defaultMealsTime.map(item => {
      return new MealTime({
        userDoc: auth.uid,
        daysWeek: [0, 1, 2, 3, 4, 5, 6],
        isActive: true,
        time: item.time,
        title: item.title,
      });
    });

    await this.firestoreRepository.setMany(
      firestoreColections.mealTimes,
      mealTimes,
    );
  }
}
