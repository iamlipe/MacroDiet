import { useUserStore } from '@stores/index';
import { useCallback, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IUser, buidSchemaAuth } from '@services/firebase/models/user';
import { calculateNutritionalInfo } from '@utils/nutritionalInfo';
import useLoader from './useLoader';
import useToast from './useToast';
import useUser from './useUser';
import useHandleError from './useHandleError';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export type LoginWithEmailDTO = {
  email: string;
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {
    login,
    logout: logoutStore,
    auth: authLogin,
    setCreateUser,
  } = useUserStore();
  const { handleInfoUser } = useUser();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { handleAuthError } = useHandleError();

  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      showLoader();

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const { user: googleAuth } = await auth().signInWithCredential(
        googleCredential,
      );

      const resp = await firestore()
        .collection('Users')
        .doc(googleAuth.uid)
        .get();

      const user = resp.data() as IUser;

      if (user) {
        const infoUser = handleInfoUser(user);

        const nutritionalInfo = calculateNutritionalInfo({
          activityLevelFactor: infoUser.activityLevel.factor,
          age: infoUser.age,
          gender: infoUser.gender.title,
          height: infoUser.height,
          weight: infoUser.weight,
          timeInWeeks: infoUser.timeInWeeks,
          weightGoal: infoUser.weightGoal,
        });

        login({ ...user, nutritionalInfo });
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
          await auth().signInWithEmailAndPassword(
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

          const nutritionalInfo = calculateNutritionalInfo({
            activityLevelFactor: infoUser.activityLevel.factor,
            age: infoUser.age,
            gender: infoUser.gender.title,
            height: infoUser.height,
            weight: infoUser.weight,
            timeInWeeks: infoUser.timeInWeeks,
            weightGoal: infoUser.weightGoal,
          });

          login({ ...user, nutritionalInfo });
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

export default useLogin;
