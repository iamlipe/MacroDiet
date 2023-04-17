import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseAuthRepository } from '@core/data/repositories/FirebaseAuthRepository';

export type RegisterDTO = {
  email: string;
  password: string;
  profile?: FirebaseAuthTypes.UpdateProfile;
};

export class RegisterUseCase {
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async register({ email, password, profile }: RegisterDTO) {
    await this.firebaseAuthRepository.signUp({
      email: email.trim(),
      password,
      profile,
    });

    return this.firebaseAuthRepository.getCurrentUser();
  }
}
