import { useState } from 'react';
import { useToast } from '@/core/infrastructure/hooks/useToast';
import { RecoveryPasswordUseCase } from '@/core/domain/services/firebase/useCases/RecoveryPassword';

export const useRecoveryPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { show: showToast } = useToast();

  const recoveryPassword = async (email: string) => {
    setIsLoading(true);

    try {
      await new RecoveryPasswordUseCase().execute(email);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { recoveryPassword, isLoading };
};
