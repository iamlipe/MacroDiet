import { useCallback, useState } from 'react';
import { useUserStore } from '@stores/user';
import { useLoader } from './useLoader';
import { buidSchemaAuth } from '@services/firebase/models/user';
import { useHandleError } from './useHandleError';
import authFirebase from '@react-native-firebase/auth';

interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { auth, setCreateUser } = useUserStore();
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { handleAuthError } = useHandleError();

  const handleRegister = useCallback(
    async ({ fullName, email, password }: RegisterDTO) => {
      try {
        setLoading(true);
        showLoader();

        const { user } = await authFirebase().createUserWithEmailAndPassword(
          email.toLowerCase().trim(),
          password,
        );

        await user.updateProfile({ displayName: fullName });

        if (user) {
          auth(buidSchemaAuth({ ...user, displayName: fullName }));
          setCreateUser({ doc: user.uid });
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        setLoading(false);
        hideLoader();
      }
    },
    [auth, handleAuthError, hideLoader, setCreateUser, showLoader],
  );

  return { handleRegister, loading };
};
