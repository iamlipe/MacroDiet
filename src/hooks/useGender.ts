import { gender } from '@__mocks__/gender';
import { useGenderStore } from '@stores/gender';
import { useCallback, useEffect, useState } from 'react';

import { useToast } from './useToast';

interface UseGenderProps {
  shouldUpdateStore?: boolean;
}

export const useGender = ({ shouldUpdateStore = false }: UseGenderProps) => {
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

  useEffect(() => {
    if (shouldUpdateStore) {
      getGender();
    }
  }, [getGender, shouldUpdateStore]);

  return { getGender, loading };
};
