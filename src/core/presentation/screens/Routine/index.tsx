import React, { useEffect } from 'react';
import { useMealTime } from '@/core/infrastructure/hooks/useMealTime';
import Background from '@/core/presentation/shared/Background';
import MealTimesView from './MealTimes.view';

const Routine = () => {
  const { fetchMealTimes } = useMealTime();

  useEffect(() => {
    fetchMealTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <MealTimesView />
    </Background>
  );
};

export default Routine;
