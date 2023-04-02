import { IAuth, IInfo, IUser } from '@services/firebase/models/user';
import { create } from 'zustand';

export interface ICreatedUser extends Partial<IInfo> {
  doc?: string;
}

type State = {
  user: Partial<IUser> | null;
  auth: (auth: IAuth) => void;
  login: (user: IUser) => void;
  logout: () => void;
  userCreate: Partial<ICreatedUser> | null;
  setCreateUser: (values: Partial<ICreatedUser>) => void;
};

export const useUserStore = create<State>(set => ({
  user: null,
  auth: values => set(() => ({ user: { ...values } })),
  login: (user: IUser) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
  userCreate: null,
  setCreateUser: values =>
    set(state => ({ userCreate: { ...state.userCreate, ...values } })),
}));
