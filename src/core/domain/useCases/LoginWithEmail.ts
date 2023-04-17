import { FirebaseAuthRepository } from '@core/data/repositories/FirebaseAuthRepository';

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

    return this.firebaseAuthRepository.getCurrentUser();
  }
}
