import { useState } from 'react';
import { GetActivitiesUseCase } from '@core/domain/useCases/GetActivities';
import { handleErrorFirestore } from '@utils/helpers/handleErrors';
import { FirebaseError } from 'firebase/app';
import { useToast } from './useToast';
import { useActivityStore } from '@core/infrastructure/store/activityStore';

export const useActivity = () => {
  const [loading, setLoading] = useState(false);
  const { show: showToast } = useToast();
  const { setAcitivityList } = useActivityStore();

  const fetchActivities = async () => {
    setLoading(true);

    try {
      const activities = await new GetActivitiesUseCase().execute();
      setAcitivityList(activities);
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return { fetchActivities, loading };
};
