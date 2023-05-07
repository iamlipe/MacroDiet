import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { WaterProps } from '@/core/domain/models/Water';

export class UpdateWaterUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute(updateWater: Partial<WaterProps>) {
    if (!updateWater.doc) {
      throw new Error('water doc not found');
    }

    await this.firestoreRepository.update(
      firestoreColections.water,
      updateWater.doc,
      {
        quantity: updateWater.quantity,
      },
    );
  }
}
