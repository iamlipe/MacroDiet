import firestore from '@react-native-firebase/firestore';
import { IUser } from '../models/user';

export type CreateUserDTO = {
  doc: string;
  user: IUser;
};

export type GetUserByDocDTO = {
  doc: string;
};

export const getUserByDoc = async ({ doc }: GetUserByDocDTO) => {
  const user = await firestore().collection('Users').doc(doc).get();
  return { user: user.data() as IUser };
};

export const createUser = async ({ doc, user }: CreateUserDTO) => {
  await firestore()
    .collection('Users')
    .doc(doc)
    .set({
      ...user,
    });

  return { createdUser: user };
};
