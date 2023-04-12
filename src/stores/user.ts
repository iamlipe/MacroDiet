import {
  IAuth,
  IInfo,
  INutritionalInfo,
  IUser,
} from '@services/firebase/models/user';
import { create } from 'zustand';

export interface ICreatedUser extends Partial<IInfo> {
  doc?: string;
}

type State = {
  user: Partial<IUser> | null;
  auth: (auth: IAuth) => void;
  login: (user: IUser) => void;
  logout: () => void;
  setNutritionInfo: (nutritionalInfo: INutritionalInfo) => void;
  userCreate: Partial<ICreatedUser> | null;
  setCreateUser: (values: Partial<ICreatedUser>) => void;
  setFavoritesFoods: (values: Array<string>) => void;
  setUser: (updatedUser: Partial<IUser>) => void;
};

const useUserStore = create<State>(set => ({
  user: null,
  auth: values => set(() => ({ user: { ...values } })),
  login: (user: IUser) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
  setNutritionInfo: nutritionalInfo =>
    set(state => ({ user: { ...state.user, nutritionalInfo } })),
  userCreate: null,
  setCreateUser: values =>
    set(state => ({ userCreate: { ...state.userCreate, ...values } })),
  setFavoritesFoods: favoritesFoods =>
    set(state => ({
      user: {
        ...state.user,
        preferences: { ...state.user.preferences, favoritesFoods },
      },
    })),
  setUser: updatedUser =>
    set(state => ({ user: { ...state.user, ...updatedUser } })),
}));

export default useUserStore;
