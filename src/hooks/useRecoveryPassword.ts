import { useCallback, useMemo, useState } from 'react';
import { useLoader } from './useLoader';
import { useHandleError } from './useHandleError';
import authFirebase from '@react-native-firebase/auth';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@routes/auth';

interface RecoveryPasswordDTO {
  email: string;
}

export const useRecoveryPassword = () => {
  const [loading, setLoading] = useState(false);
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { handleAuthError } = useHandleError();
  const { navigate: navigateAuth } = useNavigation<NavPropsAuth>();

  const initialValuesRecoveryPassword = useMemo(() => {
    return {
      email: '',
    };
  }, []);

  const recoveryPasswordSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email('email invalido').required(),
      }),
    [],
  );

  const handleRecoveryPassword = useCallback(
    async ({ email }: RecoveryPasswordDTO) => {
      try {
        setLoading(true);
        showLoader();

        await authFirebase().sendPasswordResetEmail(email);
      } catch (error) {
        handleAuthError(error);
      } finally {
        setLoading(false);
        hideLoader();
        navigateAuth('RecoveryPassword');
      }
    },
    [handleAuthError, hideLoader, navigateAuth, showLoader],
  );

  return {
    handleRecoveryPassword,
    loading,
    initialValuesRecoveryPassword,
    recoveryPasswordSchema,
  };
};
