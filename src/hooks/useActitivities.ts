import { activities } from '@__mocks__/activities';
import { useActivityStore } from '@stores/acitivity';
import { useCallback, useEffect, useState } from 'react';

import { useToast } from './useToast';

interface UseActitivitiesProps {
  shouldUpdateStore?: boolean;
}

export const useActitivities = ({
  shouldUpdateStore = false,
}: UseActitivitiesProps) => {
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

  useEffect(() => {
    if (shouldUpdateStore) {
      getActivities();
    }
  }, [getActivities, shouldUpdateStore]);

  return { getActivities, loading };
};
