import { useActivityStore } from '@stores/index';
import { useCallback, useState } from 'react';
import { IAcitivity } from '@services/firebase/models/acitivity';
import useHandleError from './useHandleError';
import firestore from '@react-native-firebase/firestore';

const useActitivities = () => {
  const [loading, setLoading] = useState(false);
  const { setAcitivities } = useActivityStore();
  const { handleFirestoreError } = useHandleError();

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
      handleFirestoreError(error);
    } finally {
      setLoading(false);
    }
  }, [handleFirestoreError, setAcitivities]);

  return { getActivities, loading };
};

export default useActitivities;
