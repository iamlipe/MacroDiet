import { useUserStore } from '@stores/user';
import { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { useLoader } from './useLoader';
import { useToast } from './useToast';

interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { auth } = useUserStore();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();

  const initialValuesFormRegister = useMemo(() => {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }, []);

  const registerSchema = useMemo(
    () =>
      Yup.object().shape({
        fullName: Yup.string()
          .matches(
            /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
            'Por favor, insira um nome completo válido',
          )
          .required(),
        email: Yup.string().email('email invalido').required(),
        password: Yup.string()
          .required()
          .min(8, 'Senha deve ter no mínimo 8 caracteres'),
        confirmPassword: Yup.string()
          .required()
          .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais'),
      }),
    [],
  );

  const handleRegister = useCallback(
    ({ fullName, email }: RegisterDTO) => {
      try {
        setLoading(true);
        showLoader();

        auth({
          name: fullName.split(' ').splice(0, 1)[0],
          lastName: fullName.split(' ').join(' '),
          email,
        });
      } catch (error) {
        showToast({ type: 'error', message: 'something went wrong' });
      } finally {
        setTimeout(() => {
          setLoading(false);
          hideLoader();
        }, 1000);
      }
    },
    [auth, hideLoader, showLoader, showToast],
  );

  return { handleRegister, loading, initialValuesFormRegister, registerSchema };
};
