import { useState } from 'react';
import { GetGenderUseCase } from '@/core/domain/services/firebase/useCases/GetGender';
import { useGenderStore } from '@/core/infrastructure/store/genderStore';
import { useToast } from '@/core/infrastructure/hooks/useToast';

export const useGender = () => {
  const [loading, setLoading] = useState(false);
  const { setGenderList } = useGenderStore();
  const { show: showToast } = useToast();

  const fetchGender = async () => {
    setLoading(true);

    try {
      const gender = await new GetGenderUseCase().execute();
      setGenderList(gender);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return { fetchGender, loading };
};
