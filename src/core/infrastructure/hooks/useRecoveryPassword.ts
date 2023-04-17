import { handleErrorFirestore } from '@utils/helpers/handleErrors';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useToast } from './useToast';
import { RecoveryPasswordUseCase } from '@core/domain/useCases/RecoveryPassword';

export const useRecoveryPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { show: showToast } = useToast();

  const recoveryPassword = async (email: string) => {
    setIsLoading(true);

    try {
      await new RecoveryPasswordUseCase().execute(email);
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

  return { recoveryPassword, isLoading };
};
