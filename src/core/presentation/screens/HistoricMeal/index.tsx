import React from 'react';
import Background from '@/core/presentation/shared/Background';
import MealHistoricView from './MealHistoric.view';

const HistoricMeal: React.FC = () => {
  return (
    <Background>
      <MealHistoricView />
    </Background>
  );
};

export default HistoricMeal;
