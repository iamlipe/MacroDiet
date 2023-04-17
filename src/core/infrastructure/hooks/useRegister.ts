import { useState } from 'react';
import { RegisterUseCase } from '@core/domain/useCases/Register';
import { useUserStore } from '@core/infrastructure/store/userStore';
import { buidSchemaAuth } from '@core/domain/models/User';
import { FirebaseError } from 'firebase/app';
import { handleErrorFirestore } from '@utils/helpers/handleErrors';
import { useToast } from './useToast';
import { RegisterForm } from '@core/infrastructure/validators/registerSchema';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { show: showToast } = useToast();
  const { setAuth } = useUserStore();

  const register = async ({ email, fullName, password }: RegisterForm) => {
    setIsLoading(true);

    try {
      const auth = await new RegisterUseCase().register({
        email,
        password,
        profile: { displayName: fullName },
      });

      if (auth) {
        setAuth(buidSchemaAuth({ ...auth, displayName: fullName }));
      }
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};
