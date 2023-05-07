import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';

export class RecoveryPasswordUseCase {
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute(email: string) {
    await this.firebaseAuthRepository.sendPasswordResetEmail(email);
  }
}
