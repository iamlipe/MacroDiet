import { useCallback, useState } from 'react';
import { useUserStore } from '@stores/index';
import { buidSchemaAuth } from '@services/firebase/models/user';
import useLoader from './useLoader';
import useHandleError from './useHandleError';
import auth from '@react-native-firebase/auth';

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { auth: authLogin, setCreateUser } = useUserStore();
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { handleAuthError } = useHandleError();

  const handleRegister = useCallback(
    async ({ fullName, email, password }: IRegister) => {
      try {
        setLoading(true);
        showLoader();

        const { user } = await auth().createUserWithEmailAndPassword(
          email.toLowerCase().trim(),
          password,
        );

        await user.updateProfile({ displayName: fullName });

        if (user) {
          authLogin(buidSchemaAuth({ ...user, displayName: fullName }));
          setCreateUser({ doc: user.uid });
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        setLoading(false);
        hideLoader();
      }
    },
    [authLogin, handleAuthError, hideLoader, setCreateUser, showLoader],
  );

  return { handleRegister, loading };
};

export default useRegister;
