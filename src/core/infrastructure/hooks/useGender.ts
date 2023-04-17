import { useState } from 'react';
import { GetGenderUseCase } from '@core/domain/useCases/GetGender';
import { handleErrorFirestore } from '@utils/helpers/handleErrors';
import { FirebaseError } from 'firebase/app';
import { useToast } from './useToast';
import { useGenderStore } from '@core/infrastructure/store/genderStore';

export const useGender = () => {
  const [loading, setLoading] = useState(false);
  const { setGenderList } = useGenderStore();
  const { show: showToast } = useToast();

  const fetchGender = async () => {
    setLoading(true);

    try {
      const gender = await new GetGenderUseCase().execute();
      setGenderList(gender);
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return { fetchGender, loading };
};
