import { useCallback, useState } from 'react';
import { useGenderStore } from '@stores/gender';
import { useToast } from './useToast';
import { gender } from '@__mocks__/gender';

export const useGender = () => {
  const [loading, setLoading] = useState(false);
  const { setGender } = useGenderStore();
  const { show: showToast } = useToast();

  const getGender = useCallback(async () => {
    try {
      setLoading(true);
      setGender(gender.data);
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(true);
    }
  }, [setGender, showToast]);

  return { getGender, loading };
};
