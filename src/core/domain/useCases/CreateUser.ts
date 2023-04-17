import { FirebaseAuthRepository } from '@core/data/repositories/FirebaseAuthRepository';
import { FirestoreRepository } from '@core/data/repositories/FirestoreRepository';
import { InfoProps, User, buidSchemaAuth } from '@core/domain/models/User';
import { defaultPreferences } from '../../../../__mocks__/users';
import { firestoreColections } from '@utils/constants/firestoreCollections';

interface CreateUserDTO {
  info: InfoProps;
}

export class CreateUserUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute({ info }: CreateUserDTO) {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    const user = buidSchemaAuth(auth);

    const data = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      info,
      preferences: defaultPreferences,
    });

    await this.firestoreRepository.set(
      firestoreColections.users,
      auth.uid,
      data,
    );

    return data;
  }
}
