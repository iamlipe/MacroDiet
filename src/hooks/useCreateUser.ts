import { useNavigation } from '@react-navigation/native';
import {
  CreateUserStackParamsList,
  NavPropsCreateUser,
} from '@routes/createUserStack';
import { IInfo, User } from '@services/firebase/models/user';
import { ICreatedUser, useUserStore } from '@stores/user';
import { useCallback, useMemo, useState } from 'react';
import { useLoader } from './useLoader';
import { useToast } from './useToast';
import { useMeals } from './useMeals';
import { createUser as createUserFirebase } from '@services/firebase/repositories/users';
import * as Yup from 'yup';
import { defaultPreferences } from '@__mocks__/users';

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
  const { createMealsDay } = useMeals({ shouldUpdateStore: false });

  const initialValuesGoal = useMemo(() => {
    return {
      goalId: '',
    };
  }, []);

  const goalSchema = useMemo(
    () =>
      Yup.object().shape({
        goalId: Yup.string().required('Por favor, selecione o seu objetivo.'),
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
        activityId: Yup.string().required(
          'Por favor, selecione um nível de atividade.',
        ),
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
          .max(
            new Date(),
            'A data selecionada deve estar no passado em relação ao dia atual.',
          )
          .required('Por favor, selecione a sua data de nascimento.'),
      }),
    [],
  );

  const initialValuesGender = useMemo(() => {
    return {
      genderId: 'Por favor, selecione o seu sexo biológico',
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
          quantity: Yup.string()
            .min(1, 'Digite uma altura valida')
            .required('Digite a sua altura'),
          measureId: Yup.string().required('Selecione uma unidade de medida.'),
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
          quantity: Yup.string()
            .min(1, 'Digite um peso valido')
            .required('Informe o seu peso atual.'),
          measureId: Yup.string().required('Selecione uma unidade de medida.'),
        }),
      }),
    [],
  );

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

      const { createdUser } = await createUserFirebase({
        doc,
        user: newUser,
      });

      login(createdUser);
      createMealsDay({ mealsTime: defaultPreferences.mealsTime });
    } catch (error) {
      showToast({ type: 'error', message: error.message });
    } finally {
      setTimeout(() => hideLoading(), 1000);
    }
  }, [
    createMealsDay,
    hideLoading,
    login,
    showLoading,
    showToast,
    user.email,
    user.lastName,
    user.name,
    user.phone,
    user.photo,
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
