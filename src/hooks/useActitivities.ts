import { activities } from '@__mocks__/activities';
import { useActivityStore } from '@stores/acitivity';
import { useCallback, useState } from 'react';

import { useToast } from './useToast';

export const useActitivities = () => {
  const [loading, setLoading] = useState(false);
  const { setAcitivities } = useActivityStore();
  const { show: showToast } = useToast();

  const getActivities = useCallback(async () => {
    try {
      setLoading(true);
      setAcitivities(activities.data);
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(false);
    }
  }, [setAcitivities, showToast]);

  return { getActivities, loading };
};
