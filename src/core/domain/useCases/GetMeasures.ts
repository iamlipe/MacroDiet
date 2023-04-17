import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirestoreRepository } from '@core/data/repositories/FirestoreRepository';
import { buildSchemaMeasure } from '@core/domain/models/Measure';
import { firestoreColections } from '@utils/constants/firestoreCollections';

export class GetMeasuresUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute(type?: 'length' | 'mass') {
    const queryCallback = !type
      ? undefined
      : (ref: FirebaseFirestoreTypes.Query) => {
          return ref.where('type', '==', type);
        };

    const data = await this.firestoreRepository.getMany(
      firestoreColections.measures,
      queryCallback,
    );

    return data.map(buildSchemaMeasure);
  }
}
