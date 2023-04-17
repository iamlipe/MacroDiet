import { FirebaseAuthRepository } from '@core/data/repositories/FirebaseAuthRepository';
import { FirestoreRepository } from '@core/data/repositories/FirestoreRepository';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { firestoreColections } from '@utils/constants/firestoreCollections';
import { buildSchemaMeal } from '@core/domain/models/Meal';

export class GetMealsUseCase {
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

    const queryCallback = (ref: FirebaseFirestoreTypes.Query) => {
      return ref.where('userDoc', '==', auth.uid);
    };

    const data = await this.firestoreRepository.getMany(
      firestoreColections.meals,
      queryCallback,
    );

    if (data) {
      return data.map(buildSchemaMeal);
    }

    return undefined;
  }
}
