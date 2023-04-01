import { users } from '@__mocks__/users';
import { useUserStore } from '@stores/user';
import { useCallback, useMemo, useState } from 'react';
import { getUserByDoc } from '@services/firebase/repositories/users';
import authFirebase from '@react-native-firebase/auth';

import * as Yup from 'yup';

import { useLoader } from './useLoader';
import { useToast } from './useToast';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface LoginWithEmailDTO {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { login, logout: logoutStore, auth } = useUserStore();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();

  const initialValuesLoginWithEmail = useMemo(() => {
    return {
      email: '',
      password: '',
    };
  }, []);

  const loginWithEmailSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email('email invalido').required(),
        password: Yup.string()
          .required()
          .min(8, 'Senha deve ter no mínimo 8 caracteres'),
      }),
    [],
  );

  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      showLoader();

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential =
        authFirebase.GoogleAuthProvider.credential(idToken);

      const { user: googleAuth } = await authFirebase().signInWithCredential(
        googleCredential,
      );

      const user = await getUserByDoc({ doc: googleAuth.uid });

      if (!user) {
        auth({
          name: googleAuth.displayName.split(' ').splice(0, 1)[0],
          lastName: googleAuth.displayName.split(' ').join(' '),
          email: googleAuth.email,
          phone: googleAuth.phoneNumber,
          photo: googleAuth.photoURL,
        });
      }

      login(user);
    } catch (error) {
      if (error instanceof Error) {
        showToast({
          type: 'error',
          message: error.message,
        });
      } else {
        showToast({
          type: 'error',
          message: 'something went wrong',
        });
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
        hideLoader();
      }, 1000);
    }
  }, [auth, hideLoader, login, showLoader, showToast]);

  // NOTE: implement when have a developer team
  const loginWithFacebook = useCallback(async () => {
    showToast({ type: 'warning', message: 'not implemented' });
  }, [showToast]);

  // NOTE: implement when have a developer team
  const loginWithApple = useCallback(async () => {
    showToast({ type: 'warning', message: 'not implemented' });
  }, [showToast]);

  const loginWithEmail = useCallback(
    async ({ email }: LoginWithEmailDTO) => {
      try {
        setLoading(true);
        showLoader();
        const user = users.data.filter(item => item.email === email);
        if (user.length) {
          login(user[0]);
        }
      } catch (error) {
        showToast({ type: 'error', message: 'something went wrong' });
      } finally {
        setTimeout(() => {
          setLoading(false);
          hideLoader();
        }, 1000);
      }
    },
    [hideLoader, login, showLoader, showToast],
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      showLoader();
      logoutStore();
    } catch (error) {
      showToast({ type: 'error', message: 'something went wrong' });
    } finally {
      setTimeout(() => {
        setLoading(false);
        hideLoader();
      }, 1000);
    }
  }, [hideLoader, logoutStore, showLoader, showToast]);

  return {
    loginWithApple,
    loginWithGoogle,
    loginWithFacebook,
    loginWithEmail,
    logout,
    initialValuesLoginWithEmail,
    loginWithEmailSchema,
    loading,
  };
};
