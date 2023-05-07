import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';
import { buidSchemaAuth } from '@/core/domain/models/User';

export type LoginDTO = {
  email: string;
  password: string;
};

export class LoginWithEmailUseCase {
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute({ email, password }: LoginDTO) {
    await this.firebaseAuthRepository.signIn({
      email,
      password,
    });

    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    return buidSchemaAuth(auth);
  }
}
