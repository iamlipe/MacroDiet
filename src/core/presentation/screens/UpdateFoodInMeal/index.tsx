import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FoodProps } from '@/core/domain/models/Food';
import { MealProps } from '@/core/domain/models/Meal';
import Background from '@/core/presentation/shared/Background';
import UpdateFoodInMealView from './UpdateFoodInMeal.view';

type StackParamsList = {
  Info: {
    type: 'add' | 'remove';
  };
  MealData: {
    meal: MealProps;
  };
  FoodData: {
    food: FoodProps;
  };
};

const UpdateFoodInMeal = () => {
  const {
    params: { meal },
  } = useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const {
    params: { food },
  } = useRoute<RouteProp<StackParamsList, 'FoodData'>>();
  const {
    params: { type },
  } = useRoute<RouteProp<StackParamsList, 'Info'>>();

  return (
    <Background>
      <UpdateFoodInMealView meal={meal} food={food} type={type} />
    </Background>
  );
};

export default UpdateFoodInMeal;
