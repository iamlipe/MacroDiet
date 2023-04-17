import { create } from 'zustand';
import { IAuth, IInfo, IUser } from '@core/domain/models/User';

type State = {
  user: Partial<IUser> | null;
  setAuth: (auth: IAuth) => void;
  setUser: (user: IUser) => void;
  reset: () => void;

  formCreateUser: Partial<IInfo> | null;
  setFormCreateUser: (values: Partial<IInfo>) => void;
};

export const useUserStore = create<State>(set => ({
  user: null,
  setAuth: values => set(() => ({ user: { ...values } })),
  setUser: (user: IUser) => set(() => ({ user })),
  reset: () => set(() => ({ user: null })),

  formCreateUser: null,
  setFormCreateUser: values =>
    set(state => ({ formCreateUser: { ...state.formCreateUser, ...values } })),
}));
