import { useCallback, useState } from 'react';
import { useGoalStore } from '@stores/goal';
import { useToast } from './useToast';
import { goals } from '@__mocks__/goals';

export const useGoals = () => {
  const [loading, setLoading] = useState(false);
  const { setGoals } = useGoalStore();
  const { show: showToast } = useToast();

  const getGoals = useCallback(async () => {
    try {
      setLoading(true);
      setGoals(goals.data);
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(true);
    }
  }, [setGoals, showToast]);

  return { getGoals, loading };
};
