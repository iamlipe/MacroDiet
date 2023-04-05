import { useNavigation } from '@react-navigation/native';
import {
  CreateUserStackParamsList,
  NavPropsCreateUser,
} from '@routes/createUserStack';
import { IInfo, User } from '@services/firebase/models/user';
import { ICreatedUser, useUserStore } from '@stores/user';
import { useCallback, useState } from 'react';
import { useLoader } from './useLoader';
import { useToast } from './useToast';
import { defaultPreferences } from '@__mocks__/users';
import firestore from '@react-native-firebase/firestore';

interface HandleFormProps {
  values: Partial<IInfo>;
  navigateTo: keyof CreateUserStackParamsList;
}

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const { show: showLoading, hide: hideLoading } = useLoader();
  const { setCreateUser, login, userCreate, user } = useUserStore();
  const { show: showToast } = useToast();
  const { navigate: navigateCreateUser } = useNavigation<NavPropsCreateUser>();

  const handleValuesForm = useCallback((data: any): Partial<IInfo> => {
    let values = {};

    if (data.birthDate) {
      const date = new Date(data.birthDate);

      const birthDate = {
        milliseconds: date.getTime(),
        nanoseconds: date.getTime() * 1000000,
      };

      values = { ...values, birthDate };
    }

    if (data.height) {
      const height = {
        quantity: Number(data.height.quantity),
        measureId: data.height.measureId,
      };

      values = { ...values, height };
    }

    if (data.weigth) {
      const weigth = {
        quantity: Number(data.weigth.quantity),
        measureId: data.weigth.measureId,
      };

      values = { ...values, weigth };
    }

    return { ...values };
  }, []);

  const handleForm = useCallback(
    ({ values, navigateTo }: HandleFormProps) => {
      try {
        setCreateUser(values);
        navigateCreateUser(navigateTo);
      } catch (error) {
        showToast({ type: 'error', message: 'something went wrong' });
      }
    },
    [navigateCreateUser, setCreateUser, showToast],
  );

  const createUser = useCallback(async () => {
    try {
      const { doc, activityId, birthDate, genderId, goalId, height, weigth } =
        userCreate as unknown as ICreatedUser;

      setLoading(true);
      showLoading();

      const newUser = new User({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        info: {
          activityId,
          birthDate,
          genderId,
          goalId,
          height,
          weigth,
        },
        preferences: defaultPreferences,
      });

      await firestore()
        .collection('Users')
        .doc(doc)
        .set({ ...user });

      login(newUser);
    } catch (error) {
      showToast({ type: 'error', message: error.message });
    } finally {
      setTimeout(() => hideLoading(), 1000);
    }
  }, [hideLoading, login, showLoading, showToast, user, userCreate]);

  return {
    handleValuesForm,
    handleForm,
    createUser,
    loading,
  };
};
