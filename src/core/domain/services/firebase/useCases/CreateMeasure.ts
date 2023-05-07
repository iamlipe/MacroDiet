import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { Measure } from '@/core/domain/models/Measure';

interface CreateMeasureDTO {
  multiple: number;
  title: string;
  type: 'mass' | 'length';
  acronym?: string;
}

export class CreateMeasureUseCase {
  private firestoreRepository: FirestoreRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
  }

  async execute(values: CreateMeasureDTO) {
    const newMeasure = new Measure({
      multiple: values.multiple,
      title: values.title,
      type: values.type,
      acronym: values.acronym,
    });

    const measureDoc = await this.firestoreRepository.add(
      firestoreColections.measures,
      newMeasure,
    );

    return measureDoc;
  }
}
