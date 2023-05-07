import { AsyncStorageRepository } from '@/core/data/repositories/AsyncStorageCacheRepository';
import { storageKeys } from '@/utils/constants/storageKeys';
import { AuthProps } from '@/core/domain/models/User';

export class AuthCache {
  private asyncStorageRepository: AsyncStorageRepository;

  constructor() {
    this.asyncStorageRepository = new AsyncStorageRepository();
  }

  async read() {
    return this.asyncStorageRepository.get(storageKeys.user);
  }

  async save(data: AuthProps) {
    await this.asyncStorageRepository.set(storageKeys.user, data);
  }

  async remove() {
    await this.asyncStorageRepository.removeItem(storageKeys.user);
  }
}
