import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';

export class LogoutUseCase {
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute() {
    await this.firebaseAuthRepository.signOut();
  }
}
