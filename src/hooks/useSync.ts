import { useSyncStore } from '@stores/sync';
import { useCallback, useEffect } from 'react';

import { useActitivities } from './useActitivities';
import { useGender } from './useGender';
import { useGoals } from './useGoals';
import { useMeasures } from './useMeasures';
import { useToast } from './useToast';

export const useSync = () => {
  const { setIsSync } = useSyncStore();
  const { getMeasures } = useMeasures();
  const { getGoals } = useGoals();
  const { getActivities } = useActitivities();
  const { getGender } = useGender();
  const { show: showToast } = useToast();

  const sync = useCallback(async () => {
    try {
      setIsSync(true);
      await getMeasures();
      await getGoals();
      await getActivities();
      await getGender();
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setTimeout(() => setIsSync(false), 3000);
    }
  }, [getActivities, getGender, getGoals, getMeasures, setIsSync, showToast]);

  useEffect(() => {
    sync();
  }, [sync]);
};
