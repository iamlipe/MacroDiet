import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@routes/auth';
import useLoader from './useLoader';
import useHandleError from './useHandleError';
import auth from '@react-native-firebase/auth';

interface RecoveryPasswordDTO {
  email: string;
}

const useRecoveryPassword = () => {
  const [loading, setLoading] = useState(false);
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { handleAuthError } = useHandleError();
  const { navigate: navigateAuth } = useNavigation<NavPropsAuth>();

  const handleRecoveryPassword = useCallback(
    async ({ email }: RecoveryPasswordDTO) => {
      try {
        setLoading(true);
        showLoader();

        await auth().sendPasswordResetEmail(email);
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

  return { handleRecoveryPassword, loading };
};

export default useRecoveryPassword;
