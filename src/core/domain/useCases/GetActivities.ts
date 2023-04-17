import { FirestoreRepository } from '@core/data/repositories/FirestoreRepository';
import { buildSchemaActivity } from '@core/domain/models/Activity';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { firestoreColections } from '@utils/constants/firestoreCollections';

export class GetActivitiesUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute() {
    const queryCallback = (ref: FirebaseFirestoreTypes.Query) => {
      return ref.orderBy('factor', 'desc');
    };

    const data = await this.firestoreRepository.getMany(
      firestoreColections.activities,
      queryCallback,
    );

    return data.map(buildSchemaActivity);
  }
}
