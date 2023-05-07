import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';

export class GetAuthUseCase {
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute() {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    return auth;
  }
}
