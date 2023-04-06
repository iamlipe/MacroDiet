import { useActivityStore } from '@stores/acitivity';
import { useCallback, useState } from 'react';
import { useToast } from './useToast';
import { IAcitivity } from '@services/firebase/models/acitivity';
import firestore from '@react-native-firebase/firestore';

export const useActitivities = () => {
  const [loading, setLoading] = useState(false);
  const { setAcitivities } = useActivityStore();
  const { show: showToast } = useToast();

  const getActivities = useCallback(async () => {
    try {
      setLoading(true);

      const data = await firestore().collection('Activities').get();

      const activities: IAcitivity[] = data.docs.map(doc => {
        const goal = doc.data();

        return {
          doc: doc.id,
          factor: goal.factor,
          title: goal.title,
        };
      });

      setAcitivities(activities);
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(false);
    }
  }, [setAcitivities, showToast]);

  return { getActivities, loading };
};
