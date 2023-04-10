import { useCallback } from 'react';
import { useSyncStore } from '@stores/index';
import useActitivities from './useActitivities';
import useGender from './useGender';
import useGoals from './useGoals';
import useMeasures from './useMeasures';
import useToast from './useToast';

const useSync = () => {
  const { setIsSync } = useSyncStore();
  const { getMeasures, getMesuresLength, getMesuresMass } = useMeasures();
  const { getGoals } = useGoals();
  const { getActivities } = useActitivities();
  const { getGenders } = useGender();
  const { show: showToast } = useToast();

  const sync = useCallback(async () => {
    try {
      setIsSync(true);

      await getMeasures();
      await getMesuresLength();
      await getMesuresMass();
      await getGoals();
      await getActivities();
      await getGenders();
    } catch (error) {
      showToast({ type: 'error', message: 'Something went wrong' });
    } finally {
      setIsSync(false);
    }
  }, [
    getActivities,
    getGenders,
    getGoals,
    getMeasures,
    getMesuresLength,
    getMesuresMass,
    setIsSync,
    showToast,
  ]);

  return { sync };
};

export default useSync;
