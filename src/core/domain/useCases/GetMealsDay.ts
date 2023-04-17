import { FirebaseAuthRepository } from '@core/data/repositories/FirebaseAuthRepository';
import { FirestoreRepository } from '@core/data/repositories/FirestoreRepository';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { firestoreColections } from '@utils/constants/firestoreCollections';
import { buildSchemaMeal } from '@core/domain/models/Meal';
import moment from 'moment';

export class GetMealsDayUseCase {
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

    const date = new Date();

    const startOfDay = moment(date).startOf('day').valueOf();
    const endOfDay = moment(date).endOf('day').valueOf();

    const queryCallback = (ref: FirebaseFirestoreTypes.Query) => {
      return ref
        .where('userDoc', '==', auth.uid)
        .where('time.milliseconds', '>', startOfDay)
        .where('time.milliseconds', '<', endOfDay);
    };

    const data = await this.firestoreRepository.getMany(
      firestoreColections.meals,
      queryCallback,
    );

    return data.map(buildSchemaMeal);
  }
}
