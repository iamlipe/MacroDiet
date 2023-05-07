import { create } from 'zustand';
import { AuthProps, InfoProps, IUser } from '@/core/domain/models/User';

export interface CreateUserProps extends InfoProps {
  typeAccount: 'google' | 'email';
}

type State = {
  user: Partial<IUser> | null;
  setAuth: (auth: AuthProps) => void;
  setUser: (user: IUser) => void;
  reset: () => void;

  formCreateUser: Partial<CreateUserProps> | null;
  setFormCreateUser: (values: Partial<CreateUserProps>) => void;
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
