import { useSyncStore } from '@stores/sync';
import { useCallback } from 'react';
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
  const { getGenders } = useGender();
  const { show: showToast } = useToast();

  const sync = useCallback(async () => {
    try {
      setIsSync(true);

      await getMeasures();
      await getGoals();
      await getActivities();
      await getGenders();
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setIsSync(false);
    }
  }, [getActivities, getGenders, getGoals, getMeasures, setIsSync, showToast]);

  return { sync };
};
