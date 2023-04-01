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
  const user = await firestore().collection('users').doc(doc).get();
  return user.data() as IUser;
};

export const createUser = async ({ doc, user }: CreateUserDTO) => {
  const createdUser = await firestore()
    .collection('Users')
    .doc(doc)
    .set({ ...user });

  return createdUser;
};
