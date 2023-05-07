import { useState } from 'react';
import { GetActivitiesUseCase } from '@/core/domain/services/firebase/useCases/GetActivities';
import { useToast } from '@/core/infrastructure/hooks/useToast';
import { useActivityStore } from '@/core/infrastructure/store/activityStore';

export const useActivity = () => {
  const [loading, setLoading] = useState(false);
  const { show: showToast } = useToast();
  const { setAcitivityList } = useActivityStore();

  const fetchActivities = async () => {
    setLoading(true);

    try {
      const activities = await new GetActivitiesUseCase().execute();
      setAcitivityList(activities);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return { fetchActivities, loading };
};
