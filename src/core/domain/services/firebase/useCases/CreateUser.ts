import { FirebaseAuthRepository } from '@/core/data/repositories/FirebaseAuthRepository';
import { FirestoreRepository } from '@/core/data/repositories/FirestoreRepository';
import { InfoProps, User, buidSchemaAuth } from '@/core/domain/models/User';
import { firestoreColections } from '@/utils/constants/firestoreCollections';

interface CreateUserDTO {
  info: InfoProps;
  typeAccount: 'google' | 'email';
}

export class CreateUserUseCase {
  private firestoreRepository: FirestoreRepository;
  private firebaseAuthRepository: FirebaseAuthRepository;

  constructor() {
    this.firestoreRepository = new FirestoreRepository();
    this.firebaseAuthRepository = new FirebaseAuthRepository();
  }

  async execute({ info, typeAccount }: CreateUserDTO) {
    const auth = this.firebaseAuthRepository.getCurrentUser();

    if (!auth) {
      throw new Error('No authenticated user found');
    }

    const user = buidSchemaAuth(auth);

    const data = new User({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone,
      photo: user.photo,
      typeAccount,
      info,
      preferences: {
        favoritesFoods: [],
        notifications: {
          receiveNotifiicationsMeals: false,
          reciveNotificationsDrinkWatter: false,
        },
      },
    });

    await this.firestoreRepository.set(
      firestoreColections.users,
      auth.uid,
      data,
    );

    return data;
  }
}
