import { goals } from '@__mocks__/goals';
import { useGoalStore } from '@stores/goal';
import { useCallback, useEffect, useState } from 'react';

import { useToast } from './useToast';

interface UseGoalsProps {
  shouldUpdateStore?: boolean;
}

export const useGoals = ({ shouldUpdateStore = false }: UseGoalsProps) => {
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

  useEffect(() => {
    if (shouldUpdateStore) {
      getGoals();
    }
  }, [getGoals, shouldUpdateStore]);

  return { getGoals, loading };
};
