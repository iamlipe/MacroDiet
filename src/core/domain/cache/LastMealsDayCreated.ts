import { AsyncStorageRepository } from '@/core/data/repositories/AsyncStorageCacheRepository';
import { storageKeys } from '@/utils/constants/storageKeys';

export class LastMealsDayCreatedCache {
  private asyncStorageRepository: AsyncStorageRepository;

  constructor() {
    this.asyncStorageRepository = new AsyncStorageRepository();
  }

  async read() {
    return this.asyncStorageRepository.get(storageKeys.lastMealsDayCreated);
  }

  async save(data: string) {
    await this.asyncStorageRepository.set(
      storageKeys.lastMealsDayCreated,
      data,
    );
  }

  async remove() {
    await this.asyncStorageRepository.removeItem(
      storageKeys.lastMealsDayCreated,
    );
  }
}
