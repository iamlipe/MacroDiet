import { useCallback, useEffect, useState } from 'react';
import { calculateNutritionalInfo } from '@/utils/helpers/nutritionalInfo';
import { buidSchemaAuth } from '@/core/domain/models/User';
import { AuthCache } from '@/core/domain/cache/Auth';
import { LoginWithEmailUseCase } from '@/core/domain/services/firebase/useCases/LoginWithEmail';
import { LoginWithGoogleUseCase } from '@/core/domain/services/firebase/useCases/LoginWithGoogle';
import { LogoutUseCase } from '@/core/domain/services/firebase/useCases/Logout';
import { GetAuthUseCase } from '@/core/domain/services/firebase/useCases/GetAuth';
import { GetUserUseCase } from '@/core/domain/services/firebase/useCases/GetUser';
import { LoginForm } from '@/core/infrastructure/validators/loginSchema';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useMeasureStore } from '@/core/infrastructure/store/measureStore';
import { useActivityStore } from '@/core/infrastructure/store/activityStore';
import { useGenderStore } from '@/core/infrastructure/store/genderStore';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { useLoader } from '@/core/infrastructure/hooks/useLoader';
import { useToast } from '@/core/infrastructure/hooks/useToast';
import { useActivity } from '@/core/infrastructure/hooks/useActivity';
import { useGender } from '@/core/infrastructure/hooks/useGender';
import { useMeasure } from '@/core/infrastructure/hooks/useMeasure';

export const useLogin = () => {
  const [canHandleLogin, setCanHandleLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, setUser, reset, setFormCreateUser } = useUserStore();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { handleInfoUser } = useUser();
  const { fetchActivities } = useActivity();
  const { fetchGender } = useGender();
  const { fetchMeasures } = useMeasure();
  const { genderList } = useGenderStore();
  const { measureList, measureMassList, measureLengthList } = useMeasureStore();
  const { acitivityList } = useActivityStore();

  const checkLoginConditions =
    canHandleLogin &&
    acitivityList?.length &&
    genderList?.length &&
    measureList?.length &&
    measureLengthList?.length &&
    measureMassList?.length;

  const handleLogin = useCallback(async () => {
    setCanHandleLogin(false);

    try {
      const user = await new GetUserUseCase().execute();

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
            goalWeight: info.goalWeight,
            timeInWeeks: info.timeInWeeks,
          });

          setUser({ ...user, nutritionalInfo });
        }
      } else {
        const auth = await new GetAuthUseCase().execute();
        setAuth(buidSchemaAuth(auth));
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    }
  }, [handleInfoUser, setAuth, setUser, showToast]);

  const loginWithEmail = async ({ email, password }: LoginForm) => {
    setIsLoading(true);
    showLoader();

    setFormCreateUser({ typeAccount: 'email' });

    try {
      const auth = await new LoginWithEmailUseCase().execute({
        email,
        password,
      });

      if (auth) {
        await new AuthCache().save(auth);
        await fetchActivities();
        await fetchGender();
        await fetchMeasures();

        setCanHandleLogin(true);
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    showLoader();

    setFormCreateUser({ typeAccount: 'google' });

    try {
      const auth = await new LoginWithGoogleUseCase().execute();

      if (auth) {
        await new AuthCache().save(auth);
        await fetchActivities();
        await fetchGender();
        await fetchMeasures();

        setCanHandleLogin(true);
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  const logout = async () => {
    setIsLoading(true);
    showLoader();

    try {
      await new LogoutUseCase().execute();
      await new AuthCache().remove();
      reset();
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  const rememberLogin = async () => {
    setIsLoading(true);

    try {
      const auth = await new AuthCache().read();

      if (auth) {
        await fetchActivities();
        await fetchGender();
        await fetchMeasures();

        setCanHandleLogin(true);
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (checkLoginConditions) {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkLoginConditions]);

  return {
    loginWithEmail,
    loginWithGoogle,
    logout,
    rememberLogin,
    isLoading,
  };
};
