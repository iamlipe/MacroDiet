import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';
import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { buildSchemaUser } from '@/core/domain/models/User';
import { firestoreColections } from '@/utils/constants/firestoreCollections';

export class GetUserUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute() {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    const user = await this.firestoreRepository.get(
      firestoreColections.users,
      auth.uid,
    );

    if (!user) {
      return undefined;
    }

    return buildSchemaUser(user);
  }
}
