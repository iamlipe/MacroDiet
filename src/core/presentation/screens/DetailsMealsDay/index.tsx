import React, { useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { useMeals } from '@core/infrastructure/hooks/useMeals';
import { useMealStore } from '@core/infrastructure/store/mealStore';
import { useUserStore } from '@core/infrastructure/store/userStore';
import { View } from 'react-native';
import ProgressBar from '@core/presentation/shared/ProgressBar';
import Background from '@core/presentation/shared/Background';
import {
  StyledProgressCircle,
  StyledScroll,
  StyledContainerProgressInfo,
  StyledLabelConsumedKcal,
  StyledLabelGoalKcal,
  StyledLabelNutritionalInfo,
  StyledLabelRemainKcal,
  StyledHeaderNutrionalInfo,
  StyledHeaderNutrionalInfoWithoutProgressBar,
  StyledLabelNutritionalInfoWithoutProgressBar,
  StyledLabelNutrionalInfoConsumedWithoutProgressbar,
} from './styles';
import Loading from '@core/presentation/shared/Loading';

const DetailsMealsDay = () => {
  const { colors } = useTheme();
  const { handleInfoMealsDay } = useMeals();
  const { mealDayList } = useMealStore();
  const { user } = useUserStore();

  const progressInfo = useMemo(() => {
    if (!mealDayList) {
      return [];
    }

    return [
      {
        title: 'Proteina',
        consumed: handleInfoMealsDay(mealDayList).totalProtMeals,
        goal: user?.nutritionalInfo?.prot || 0,
      },
      {
        title: 'Carboidrato',
        consumed: handleInfoMealsDay(mealDayList).totalCarbMeals,
        goal: user?.nutritionalInfo?.carb || 0,
      },
      {
        title: 'Gordura',
        consumed: handleInfoMealsDay(mealDayList).totalFatMeals,
        goal: user?.nutritionalInfo?.fat || 0,
      },
      {
        title: 'Fibra',
        consumed: handleInfoMealsDay(mealDayList).totalFiberMeals,
        goal: user?.nutritionalInfo?.fiber || 0,
        withoutProgressBar: true,
      },
      {
        title: 'Sodio',
        consumed: handleInfoMealsDay(mealDayList).totalSodiumMeals,
        goal: user?.nutritionalInfo?.sodium || 0,
        withoutProgressBar: true,
      },
    ];
  }, [
    handleInfoMealsDay,
    mealDayList,
    user?.nutritionalInfo?.carb,
    user?.nutritionalInfo?.fat,
    user?.nutritionalInfo?.fiber,
    user?.nutritionalInfo?.prot,
    user?.nutritionalInfo?.sodium,
  ]);

  const renderProgressInfo = (
    title: string,
    consumed: number,
    goal: number,
    withoutProgressBar?: boolean,
  ) => {
    const isMilligram = title.toLowerCase() === 'sodio';

    if (withoutProgressBar) {
      return (
        <StyledHeaderNutrionalInfoWithoutProgressBar key={title}>
          <StyledLabelNutritionalInfoWithoutProgressBar>
            {`${title}:`}
          </StyledLabelNutritionalInfoWithoutProgressBar>
          <StyledLabelNutrionalInfoConsumedWithoutProgressbar>{`${consumed.toFixed(
            0,
          )} ${
            isMilligram ? 'mg' : 'g'
          }`}</StyledLabelNutrionalInfoConsumedWithoutProgressbar>
        </StyledHeaderNutrionalInfoWithoutProgressBar>
      );
    }

    return (
      <StyledContainerProgressInfo key={title}>
        <StyledHeaderNutrionalInfo>
          <StyledLabelNutritionalInfo>{`${title}:`}</StyledLabelNutritionalInfo>
          <StyledLabelGoalKcal>{`${goal.toFixed(0)} ${
            isMilligram ? 'mg' : 'g'
          }`}</StyledLabelGoalKcal>
        </StyledHeaderNutrionalInfo>
        <ProgressBar percentage={consumed / goal} />
        <StyledLabelRemainKcal>
          {`Remain: ${(goal - consumed).toFixed(0)} ${
            isMilligram ? 'mg' : 'g'
          }`}
        </StyledLabelRemainKcal>
      </StyledContainerProgressInfo>
    );
  };

  return (
    <Background>
      <StyledScroll>
        <View>
          {mealDayList ? (
            <>
              <StyledProgressCircle
                animate
                progress={
                  handleInfoMealsDay(mealDayList).totalKcalMeals /
                  (user?.nutritionalInfo?.kcal || 0)
                }
                progressColor={colors.primary[600]}
                backgroundColor={colors.primary[300]}
                strokeWidth={16}
              />
              <StyledLabelConsumedKcal>
                {`${handleInfoMealsDay(mealDayList).totalKcalMeals}kcal`}
              </StyledLabelConsumedKcal>
            </>
          ) : (
            <Loading />
          )}

          {progressInfo.map(info =>
            renderProgressInfo(
              info.title,
              info.consumed,
              info.goal,
              info.withoutProgressBar,
            ),
          )}
        </View>
      </StyledScroll>
    </Background>
  );
};

export default DetailsMealsDay;
