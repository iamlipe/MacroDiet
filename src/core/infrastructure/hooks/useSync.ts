import { useToast } from './useToast';
import { useActivity } from './useActivity';
import { useSyncStore } from '@core/infrastructure/store/syncStore';
import { useGender } from './useGender';
import { useMeasure } from './useMeasure';

export const useSync = () => {
  const { show: showToast } = useToast();
  const { setIsSync } = useSyncStore();
  const { fetchActivities } = useActivity();
  const { fetchGender } = useGender();
  const { fetchMeasures } = useMeasure();

  const sync = async () => {
    setIsSync(true);

    try {
      await fetchActivities();
      await fetchGender();
      await fetchMeasures();
    } catch (error) {
      showToast({ type: 'error', message: 'Something went wrong' });
    } finally {
      setIsSync(false);
    }
  };

  return { sync };
};
