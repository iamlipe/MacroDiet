import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { buidSchemaAuth } from '@/core/domain/models/User';

export class LoginWithGoogleUseCase {
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute() {
    const { idToken } = await GoogleSignin.signIn();

    if (!idToken) {
      throw new Error('Something went wrong');
    }

    await this.firebaseAuthRepository.signInWithGoogle(idToken);

    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    return buidSchemaAuth(auth);
  }
}
