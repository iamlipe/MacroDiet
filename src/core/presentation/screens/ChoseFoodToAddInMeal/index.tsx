import React, { useCallback, useMemo } from 'react';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MealProps } from '@/core/domain/models/Meal';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { useFood } from '@/core/infrastructure/hooks/useFood';
import { useMealStore } from '@/core/infrastructure/store/mealStore';
import { useMeasure } from '@/core/infrastructure/hooks/useMeasure';
import Background from '@/core/presentation/shared/Background';
import RoundedButton from '@/core/presentation/shared/RoundedButton';
import ChoseFoodToAddInMealView from './ChoseFoodToAddInMeal.view';
import Loading from '../../shared/Loading';

type StackParamsList = {
  MealData: {
    meal: MealProps;
  };
};

const ChoseFoodToAddInMeal = () => {
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { fetchFoods } = useFood();
  const { fetchMeasures } = useMeasure();
  const { mealDayList } = useMealStore();

  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();

  const meal = useMemo(
    () => mealDayList?.find(item => item.doc === paramsMeal.meal.doc),
    [mealDayList, paramsMeal.meal.doc],
  );

  useFocusEffect(
    useCallback(() => {
      fetchFoods();
      fetchMeasures();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  if (!meal) <Loading />;

  return (
    <Background>
      <ChoseFoodToAddInMealView meal={meal} />

      <RoundedButton
        onPress={() => navigateLogged('AddFood')}
        icon={{ name: 'plus' }}
      />
    </Background>
  );
};

export default ChoseFoodToAddInMeal;
