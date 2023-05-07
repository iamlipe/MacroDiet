import { useState } from 'react';
import { RegisterUseCase } from '@/core/domain/services/firebase/useCases/Register';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { buidSchemaAuth } from '@/core/domain/models/User';
import { useToast } from '@/core/infrastructure/hooks/useToast';
import { RegisterForm } from '@/core/infrastructure/validators/registerSchema';

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
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};
