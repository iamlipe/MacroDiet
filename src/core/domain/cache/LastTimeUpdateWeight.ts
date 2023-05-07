import { AsyncStorageRepository } from '@/core/data/repositories/AsyncStorageCacheRepository';
import { storageKeys } from '@/utils/constants/storageKeys';

export class LastTimeUpdateWeightCache {
  private asyncStorageRepository: AsyncStorageRepository;

  constructor() {
    this.asyncStorageRepository = new AsyncStorageRepository();
  }

  async read() {
    return this.asyncStorageRepository.get(storageKeys.lastTimeUpdateWeight);
  }

  async save(data: string) {
    await this.asyncStorageRepository.set(
      storageKeys.lastTimeUpdateWeight,
      data,
    );
  }

  async remove() {
    await this.asyncStorageRepository.removeItem(
      storageKeys.lastTimeUpdateWeight,
    );
  }
}
