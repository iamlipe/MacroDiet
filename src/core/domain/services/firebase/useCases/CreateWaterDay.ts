import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { Water } from '../../../models/Water';

export class CreateWaterDayUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute(water: Water) {
    await this.firestoreRepository.add(firestoreColections.water, water);
  }
}
