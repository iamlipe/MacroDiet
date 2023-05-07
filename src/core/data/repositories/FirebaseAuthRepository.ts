import auth from '@react-native-firebase/auth';
import { LoginDTO } from '@/core/domain/services/firebase/useCases/LoginWithEmail';
import { RegisterDTO } from '@/core/domain/services/firebase/useCases/Register';

export class FirebaseAuthRepository {
  async signIn({ email, password }: LoginDTO) {
    const { user } = await auth().signInWithEmailAndPassword(email, password);

    return user;
  }

  async signInWithGoogle(idToken: string) {
    const credentials = auth.GoogleAuthProvider.credential(idToken);

    const { user } = await auth().signInWithCredential(credentials);

    return user;
  }

  async signUp({ email, password, profile }: RegisterDTO) {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    await user.updateProfile({ ...profile });

    return user;
  }

  async signOut() {
    await auth().signOut();
  }

  async updatePassword(currentPassword: string, newPassword: string) {
    const user = auth().currentUser;

    if (!user?.email) {
      throw new Error('No authenticated user found');
    }

    const credentials = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    await user.reauthenticateWithCredential(credentials);

    await user.updatePassword(newPassword);
  }

  async sendPasswordResetEmail(email: string) {
    await auth().sendPasswordResetEmail(email);
  }

  getCurrentUser() {
    return auth().currentUser;
  }
}
