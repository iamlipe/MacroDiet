import React, { useCallback, useState } from 'react';
import { MealProps } from '@/core/domain/models/Meal';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import Loading from '@/core/presentation/shared/Loading';
import Background from '@/core/presentation/shared/Background';
import EditMealView from './EditMeal.view';

type StackParamsList = {
  MealData: {
    meal: MealProps;
  };
  UpdatedMealData: {
    updatedMeal: MealProps;
  };
};

const EditMeal = () => {
  const {
    params: { meal },
  } = useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const {
    params: { updatedMeal },
  } = useRoute<RouteProp<StackParamsList, 'UpdatedMealData'>>();
  const [dataMeal, setDataMeal] = useState<MealProps | null>(null);

  useFocusEffect(
    useCallback(() => {
      setDataMeal(updatedMeal || meal);
    }, [meal, updatedMeal]),
  );

  if (!dataMeal) return <Loading />;

  return (
    <Background>
      <EditMealView dataMeal={dataMeal} setDataMeal={setDataMeal} />
    </Background>
  );
};

export default EditMeal;
