import authFirebase from '@react-native-firebase/auth';
import { useUserStore } from '@stores/user';
import { useCallback, useState } from 'react';
import { useLoader } from './useLoader';
import { useToast } from './useToast';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IUser, buidSchemaAuth } from '@services/firebase/models/user';
import { useNutritionInfo } from './useNutritionInfo';
import { useUser } from './useUser';
import firestore from '@react-native-firebase/firestore';
import { useHandleError } from './useHandleError';

interface LoginWithEmailDTO {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {
    login,
    logout: logoutStore,
    auth: authLogin,
    setCreateUser,
  } = useUserStore();
  const { getUserNutritionInfo } = useNutritionInfo();
  const { handleInfoUser } = useUser();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { handleAuthError } = useHandleError();

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

      const resp = await firestore()
        .collection('Users')
        .doc(googleAuth.uid)
        .get();

      const user = resp.data() as IUser;

      if (user) {
        const infoUser = handleInfoUser(user);

        const nutritionInfo = getUserNutritionInfo({
          activityLevelFactor: infoUser.activityLevel.factor,
          age: infoUser.age,
          gender: infoUser.gender.title,
          goalFactor: infoUser.goal.factor,
          height: infoUser.height,
          weight: infoUser.weight,
        });

        login({ ...user, nutritionInfo });
      } else {
        authLogin(buidSchemaAuth(googleAuth));
        setCreateUser({ doc: googleAuth.uid });
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  }, [
    showLoader,
    login,
    handleInfoUser,
    getUserNutritionInfo,
    authLogin,
    setCreateUser,
    handleAuthError,
    hideLoader,
  ]);

  // NOTE: implement when have a developer team
  const loginWithFacebook = useCallback(async () => {
    showToast({ type: 'warning', message: 'not implemented' });
  }, [showToast]);

  // NOTE: implement when have a developer team
  const loginWithApple = useCallback(async () => {
    showToast({ type: 'warning', message: 'not implemented' });
  }, [showToast]);

  const loginWithEmail = useCallback(
    async ({ email, password }: LoginWithEmailDTO) => {
      try {
        setLoading(true);
        showLoader();

        const { user: userFirebaseAuth } =
          await authFirebase().signInWithEmailAndPassword(
            email.toLowerCase().trim(),
            password.toLowerCase().trim(),
          );

        const resp = await firestore()
          .collection('Users')
          .doc(userFirebaseAuth.uid)
          .get();

        const user = resp.data() as IUser;

        if (user) {
          const infoUser = handleInfoUser(user);

          const nutritionInfo = getUserNutritionInfo({
            activityLevelFactor: infoUser.activityLevel.factor,
            age: infoUser.age,
            gender: infoUser.gender.title,
            goalFactor: infoUser.goal.factor,
            height: infoUser.height,
            weight: infoUser.weight,
          });

          login({ ...user, nutritionInfo });
        } else {
          authLogin(buidSchemaAuth(userFirebaseAuth));
          setCreateUser({ doc: userFirebaseAuth.uid });
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        setLoading(false);
        hideLoader();
      }
    },
    [
      authLogin,
      getUserNutritionInfo,
      handleAuthError,
      handleInfoUser,
      hideLoader,
      login,
      setCreateUser,
      showLoader,
    ],
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
    loading,
  };
};
