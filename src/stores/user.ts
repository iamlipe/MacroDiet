import { IAuth, IInfo, IUser } from '@services/firebase/models/user';
import { create } from 'zustand';

type State = {
  user: Partial<IUser> | null;
  auth: (auth: IAuth) => void;
  login: (user: IUser) => void;
  logout: () => void;

  userCreate: Partial<IInfo> | null;
  setCreateUser: (values: Partial<IInfo>) => void;
};

export const useUserStore = create<State>(set => ({
  user: null,
  auth: ({ name, email, lastName }) =>
    set(() => ({ user: { name, email, lastName } })),
  login: (user: IUser) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),

  userCreate: null,
  setCreateUser: values =>
    set(state => ({ userCreate: { ...state.userCreate, ...values } })),
}));
