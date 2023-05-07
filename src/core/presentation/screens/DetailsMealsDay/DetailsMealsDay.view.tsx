import React, { useMemo } from 'react';
import { useMeals } from '@/core/infrastructure/hooks/useMeals';
import { useMealStore } from '@/core/infrastructure/store/mealStore';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import {
  StyledContainerProgressInfo,
  StyledHeaderNutrionalInfo,
  StyledHeaderNutrionalInfoWithoutProgressBar,
  StyledLabelConsumedKcal,
  StyledLabelGoalKcal,
  StyledLabelNutrionalInfoConsumedWithoutProgressbar,
  StyledLabelNutritionalInfo,
  StyledLabelNutritionalInfoWithoutProgressBar,
  StyledLabelProgressKcal,
  StyledLabelRemainKcal,
  StyledProgressCircle,
  StyledScroll,
} from './styles';
import ProgressBar from '../../shared/ProgressBar';

const DetailsMealsDayView = () => {
  const { handleInfoMealsDay } = useMeals();
  const { user } = useUserStore();
  const { mealDayList } = useMealStore();

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

  const progressKcal = mealDayList
    ? handleInfoMealsDay(mealDayList).totalKcalMeals /
      (user?.nutritionalInfo?.kcal || 0)
    : 0;

  const consumedKcal = mealDayList
    ? handleInfoMealsDay(mealDayList).totalKcalMeals
    : 0;

  return (
    <StyledScroll>
      <React.Fragment>
        <StyledProgressCircle animate progress={progressKcal}>
          <StyledLabelProgressKcal>
            {`${progressKcal.toFixed(0)}%`}
          </StyledLabelProgressKcal>
        </StyledProgressCircle>
        <StyledLabelConsumedKcal>{`${consumedKcal.toFixed(
          0,
        )}kcal`}</StyledLabelConsumedKcal>
      </React.Fragment>

      <React.Fragment>
        {progressInfo.map(info => {
          const isMilligram = info.title.toLowerCase() === 'sodio';

          if (info.withoutProgressBar) {
            return (
              <StyledHeaderNutrionalInfoWithoutProgressBar key={info.title}>
                <StyledLabelNutritionalInfoWithoutProgressBar>
                  {`${info.title}:`}
                </StyledLabelNutritionalInfoWithoutProgressBar>
                <StyledLabelNutrionalInfoConsumedWithoutProgressbar>{`${info.consumed.toFixed(
                  0,
                )} ${
                  isMilligram ? 'mg' : 'g'
                }`}</StyledLabelNutrionalInfoConsumedWithoutProgressbar>
              </StyledHeaderNutrionalInfoWithoutProgressBar>
            );
          }

          return (
            <StyledContainerProgressInfo key={info.title}>
              <StyledHeaderNutrionalInfo>
                <StyledLabelNutritionalInfo>{`${info.title}:`}</StyledLabelNutritionalInfo>
                <StyledLabelGoalKcal>{`${info.goal.toFixed(0)} ${
                  isMilligram ? 'mg' : 'g'
                }`}</StyledLabelGoalKcal>
              </StyledHeaderNutrionalInfo>
              <ProgressBar percentage={info.consumed / info.goal} />
              <StyledLabelRemainKcal>
                {`Restam: ${(info.goal - info.consumed).toFixed(0)} ${
                  isMilligram ? 'mg' : 'g'
                }`}
              </StyledLabelRemainKcal>
            </StyledContainerProgressInfo>
          );
        })}
      </React.Fragment>
    </StyledScroll>
  );
};

export default DetailsMealsDayView;
