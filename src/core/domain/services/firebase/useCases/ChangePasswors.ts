import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';

export class ChangePassworsUseCase {
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute(currPassword: string, newPassword: string) {
    if (currPassword === newPassword) {
      throw new Error('The password must not be the same');
    }

    await this.firebaseAuthRepository.updatePassword(currPassword, newPassword);
  }
}
