import { useState } from 'react';
import { LoginWithEmailUseCase } from '@core/domain/useCases/LoginWithEmail';
import { LoginWithGoogleUseCase } from '@core/domain/useCases/LoginWithGoogle';
import { LoginForm } from '@core/infrastructure/validators/loginSchema';
import { FirebaseError } from 'firebase/app';
import { useUserStore } from '@core/infrastructure/store/userStore';
import { useToast } from './useToast';
import { handleErrorFirestore } from '@utils/helpers/handleErrors';
import { buidSchemaAuth } from '@core/domain/models/User';
import { useLoader } from './useLoader';
import { GetUserCase } from '@core/domain/useCases/GetUser';
import { useUser } from './useUser';
import { calculateNutritionalInfo } from '@utils/helpers/nutritionalInfo';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, setUser } = useUserStore();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { handleInfoUser } = useUser();

  const handleLogin = async (auth: FirebaseAuthTypes.User) => {
    const user = await new GetUserCase().execute();

    if (user) {
      const info = handleInfoUser(user.info);

      if (
        info.activityLevel?.factor &&
        info.gender?.title &&
        info.timeInWeeks
      ) {
        const nutritionalInfo = calculateNutritionalInfo({
          activityLevelFactor: info.activityLevel.factor,
          age: info.age,
          gender: info.gender.title,
          height: info.height,
          weight: info.weight,
          weightGoal: info.weightGoal,
          timeInWeeks: info.timeInWeeks,
        });
        setUser({ ...user, nutritionalInfo });
      }
    } else {
      setAuth(buidSchemaAuth(auth));
    }
  };

  const loginWithEmail = async ({ email, password }: LoginForm) => {
    setIsLoading(true);
    showLoader();

    try {
      const auth = await new LoginWithEmailUseCase().execute({
        email,
        password,
      });

      if (auth) {
        await handleLogin(auth);
      }
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    showLoader();

    try {
      const auth = await new LoginWithGoogleUseCase().execute();

      if (auth) {
        await handleLogin(auth);
      }
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  return { loginWithEmail, loginWithGoogle, isLoading };
};
