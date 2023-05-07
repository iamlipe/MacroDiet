import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { buildSchemaFood } from '@/core/domain/models/Food';

export class GetFoodsUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute() {
    const data = await this.firestoreRepository.getMany(
      firestoreColections.foods,
    );

    return data.map(buildSchemaFood);
  }
}
