import { useNavigation } from '@react-navigation/native';
import {
  CreateUserStackParamsList,
  NavPropsCreateUser,
} from '@routes/createUserStack';
import { IAuth, IInfo, User } from '@services/firebase/models/user';
import { useUserStore } from '@stores/user';
import { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { useLoader } from './useLoader';
import { useMeals } from './useMeals';
import { useToast } from './useToast';

interface HandleFormProps {
  values: Partial<IInfo>;
  navigateTo: keyof CreateUserStackParamsList;
}

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const { show: showLoading, hide: hideLoading } = useLoader();
  const { setCreateUser, login, auth, userCreate } = useUserStore();
  const { createMealsDay } = useMeals({ shouldUpdateStore: false });
  const { show: showToast } = useToast();
  const { navigate: navigateCreateUser } = useNavigation<NavPropsCreateUser>();

  const initialValuesGoal = useMemo(() => {
    return {
      goalId: '',
    };
  }, []);

  const goalSchema = useMemo(
    () =>
      Yup.object().shape({
        goalId: Yup.string().required(),
      }),
    [],
  );

  const initialValuesActivity = useMemo(() => {
    return {
      activityId: '',
    };
  }, []);

  const activitySchema = useMemo(
    () =>
      Yup.object().shape({
        activityId: Yup.string().required(),
      }),
    [],
  );

  const initialValuesBirthDate = useMemo(() => {
    return {
      birthDate: '',
    };
  }, []);

  const birthDateSchema = useMemo(
    () =>
      Yup.object().shape({
        birthDate: Yup.date()
          .max(new Date(), 'A data deve ser antes do dia atual')
          .required('A data é obrigatória'),
      }),
    [],
  );

  const initialValuesGender = useMemo(() => {
    return {
      genderId: '',
    };
  }, []);

  const genderSchema = useMemo(
    () =>
      Yup.object().shape({
        genderId: Yup.string().required(),
      }),
    [],
  );

  const initialValuesHeight = useMemo(() => {
    return {
      height: {
        quantity: '',
        measureId: '',
      },
    };
  }, []);

  const heightSchema = useMemo(
    () =>
      Yup.object().shape({
        height: Yup.object().shape({
          quantity: Yup.string().required(),
          measureId: Yup.string().required(),
        }),
      }),
    [],
  );

  const initialValuesWeigth = useMemo(() => {
    return {
      weigth: {
        quantity: '',
        measureId: '',
      },
    };
  }, []);

  const weigthSchema = useMemo(
    () =>
      Yup.object().shape({
        weigth: Yup.object().shape({
          quantity: Yup.string().required(),
          measureId: Yup.string().required(),
        }),
      }),
    [],
  );

  const handleValuesForm = useCallback((values: any): Partial<IInfo> => {
    if (values.birthDate) {
      const date = new Date(values.birthDate);

      const birthDate = {
        milliseconds: date.getMilliseconds(),
        nanoseconds: date.getMilliseconds() * 1000000,
      };

      return { birthDate };
    }

    if (values.height) {
      const height = {
        quantity: Number(values.height.quantity),
        measureId: values.height.measureId,
      };

      return { height };
    }

    if (values.weigth) {
      const weigth = {
        quantity: Number(values.weigth.quantity),
        measureId: values.weigth.measureId,
      };

      return { weigth };
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

  const createUser = useCallback(() => {
    try {
      const authData: IAuth = auth as unknown as IAuth;
      const infoData: IInfo = userCreate as unknown as IInfo;

      setLoading(true);
      showLoading();

      const newUser = new User({
        ...authData,
        info: infoData,
        preferences: {
          mealsTime: [
            { title: 'Cafe da manha', time: { hour: 8, minutes: 30 } },
            { title: 'Almoço', time: { hour: 12, minutes: 30 } },
            { title: 'Cafe da tarde', time: { hour: 17, minutes: 30 } },
            { title: 'Janta', time: { hour: 21, minutes: 0 } },
          ],
          favoritesFoods: [],
          notifications: {
            receiveNotifiicationsMeals: true,
            reciveNotificationsDrinkWatter: false,
          },
        },
      });

      createMealsDay({
        userId: '1',
        mealsTime: newUser.preferences.mealsTime,
      });

      login(newUser);
    } catch (error) {
      showToast({ type: 'error', message: 'something went wrong' });
    } finally {
      setTimeout(() => hideLoading(), 1000);
    }
  }, [
    auth,
    createMealsDay,
    hideLoading,
    login,
    showLoading,
    showToast,
    userCreate,
  ]);

  return {
    initialValuesGoal,
    initialValuesActivity,
    initialValuesBirthDate,
    initialValuesGender,
    initialValuesHeight,
    initialValuesWeigth,
    activitySchema,
    goalSchema,
    birthDateSchema,
    genderSchema,
    heightSchema,
    weigthSchema,
    handleValuesForm,
    handleForm,
    createUser,
    loading,
  };
};
