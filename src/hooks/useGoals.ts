import { useCallback, useState } from 'react';
import { useGoalStore } from '@stores/goal';
import { useToast } from './useToast';
import { IGoal } from '@services/firebase/models/goal';
import firestore from '@react-native-firebase/firestore';

export const useGoals = () => {
  const [loading, setLoading] = useState(false);
  const { setGoals } = useGoalStore();
  const { show: showToast } = useToast();

  const getGoals = useCallback(async () => {
    try {
      setLoading(true);

      const data = await firestore().collection('Goals').get();

      const goals: IGoal[] = data.docs.map(doc => {
        const goal = doc.data();

        return {
          doc: doc.id,
          factor: goal.factor,
          title: goal.title,
        };
      });

      setGoals(goals);
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(true);
    }
  }, [setGoals, showToast]);

  return { getGoals, loading };
};
