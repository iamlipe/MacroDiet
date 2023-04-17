import { FirebaseAuthRepository } from '@core/data/repositories/FirebaseAuthRepository';
import { FirestoreRepository } from '@core/data/repositories/FirestoreRepository';
import { Meal } from '@core/domain/models/Meal';
import { firestoreColections } from '@utils/constants/firestoreCollections';
import { MealTimeProps } from '@core/domain/models/User';

export class CreateMealsDayUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute(mealsTime: MealTimeProps[]) {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    const meals = mealsTime.map(({ time, title }) => {
      const mealTime = new Date();
      mealTime.setHours(time.hour);
      mealTime.setMinutes(time.minutes);

      return new Meal({
        userDoc: auth.uid,
        title,
        time: {
          milliseconds: mealTime.getTime(),
          nanoseconds: mealTime.getTime() * 1000000,
        },
        foods: [],
      });
    });

    await this.firestoreRepository.setMany(firestoreColections.meals, meals);

    return meals;
  }
}
