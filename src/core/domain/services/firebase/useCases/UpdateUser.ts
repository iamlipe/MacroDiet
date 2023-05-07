import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { firestoreColections } from '@/utils/constants/firestoreCollections';
import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';
import { User } from '@/core/domain/models/User';

export class UpdateUserUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute(updatedUser: Partial<User>) {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    await this.firestoreRepository.update(
      firestoreColections.users,
      auth.uid,
      updatedUser,
    );
  }
}
