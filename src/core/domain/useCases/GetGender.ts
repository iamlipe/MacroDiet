import { FirestoreRepository } from '@core/data/repositories/FirestoreRepository';
import { buildSchemaGender } from '@core/domain/models/Gender';
import { firestoreColections } from '@utils/constants/firestoreCollections';

export class GetGenderUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute() {
    const data = await this.firestoreRepository.getMany(
      firestoreColections.gender,
    );

    return data.map(buildSchemaGender);
  }
}
