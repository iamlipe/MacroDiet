import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MealTimeProps } from '@/core/domain/models/MealTime';
import Background from '@/core/presentation/shared/Background';
import UpdateMealTimeView from './UpdateMealTime.view';

type StackParamsList = {
  Info: {
    type: 'add' | 'remove';
  };

  Data: {
    mealTime: MealTimeProps;
  };
};

const AddRoutine = () => {
  const {
    params: { type },
  } = useRoute<RouteProp<StackParamsList, 'Info'>>();
  const {
    params: { mealTime },
  } = useRoute<RouteProp<StackParamsList, 'Data'>>();

  return (
    <Background>
      <UpdateMealTimeView mealTime={mealTime} type={type} />
    </Background>
  );
};

export default AddRoutine;
