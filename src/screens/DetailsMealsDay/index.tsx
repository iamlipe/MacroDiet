import React from 'react';
import { NavPropsDiet } from '@routes/dietStack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { useMealStore, useUserStore } from '@stores/index';
import { useMeals } from '@hooks/index';
import { View } from 'react-native';
import { Background, Header, ProgressBar } from '@components/index';
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

interface IProgressInfo {
  title: string;
  consumed: number;
  goal: number;
  withoutProgressBar?: boolean;
}

const DetailsMealsDay = () => {
  const { colors } = useTheme();
  const { handleInfoMealsDay } = useMeals();
  const { meals } = useMealStore();
  const { goBack } = useNavigation<NavPropsDiet>();
  const { user } = useUserStore();

  const renderProgressInfo = ({
    title,
    consumed,
    goal,
    withoutProgressBar,
  }: IProgressInfo) => {
    const isMilligram = title.toLowerCase() === 'sodio';

    if (withoutProgressBar) {
      return (
        <StyledHeaderNutrionalInfoWithoutProgressBar>
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
      <StyledContainerProgressInfo>
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
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Detalhes"
      />

      <StyledScroll>
        <View>
          <StyledProgressCircle
            animate
            progress={
              handleInfoMealsDay(meals).totalKcalMeals /
              user.nutritionInfo.kcalGoal
            }
            progressColor={colors.primary[600]}
            backgroundColor={colors.primary[300]}
            strokeWidth={16}
          />
          <StyledLabelConsumedKcal>
            {`${handleInfoMealsDay(meals).totalKcalMeals}kcal`}
          </StyledLabelConsumedKcal>

          {renderProgressInfo({
            title: 'Proteina',
            consumed: handleInfoMealsDay(meals).totalProtMeals,
            goal: user.nutritionInfo.prot,
          })}
          {renderProgressInfo({
            title: 'Carboidrato',
            consumed: handleInfoMealsDay(meals).totalCarbMeals,
            goal: user.nutritionInfo.carb,
          })}
          {renderProgressInfo({
            title: 'Gordura',
            consumed: handleInfoMealsDay(meals).totalFatMeals,
            goal: user.nutritionInfo.fat,
          })}
          {renderProgressInfo({
            title: 'Fibra',
            consumed: handleInfoMealsDay(meals).totalFiberMeals,
            goal: user.nutritionInfo.fiber,
            withoutProgressBar: true,
          })}
          {renderProgressInfo({
            title: 'Sodio',
            consumed: handleInfoMealsDay(meals).totalSodiumMeals,
            goal: user.nutritionInfo.sodium,
            withoutProgressBar: true,
          })}
        </View>
      </StyledScroll>
    </Background>
  );
};

export default DetailsMealsDay;
