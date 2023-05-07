import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';
import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { buildSchemaWater } from '@/core/domain/models/Water';
import moment from 'moment';

export class GetWaterDayUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute(dateString: string) {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    const date = new Date(dateString);

    const startOfDay = moment(date).startOf('day').valueOf();
    const endOfDay = moment(date).endOf('day').valueOf();

    const queryCallback = (ref: FirebaseFirestoreTypes.Query) => {
      return ref
        .where('userDoc', '==', auth.uid)
        .where('time.milliseconds', '>', startOfDay)
        .where('time.milliseconds', '<', endOfDay);
    };

    const data = await this.firestoreRepository.getMany(
      firestoreColections.water,
      queryCallback,
    );

    return data.map(buildSchemaWater)[0];
  }
}
