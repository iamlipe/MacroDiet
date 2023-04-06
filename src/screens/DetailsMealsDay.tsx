import { Background } from '@components/Backgroud';
import { Container } from '@components/Container';
import { Header } from '@components/Header';
import { Label } from '@components/Label';
import { Loading } from '@components/Loading';
import { ProgressBar } from '@components/ProgressBar';
import { Scroll } from '@components/Scroll';
import { useMeals } from '@hooks/useMeals';
import { useNavigation } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { useMealStore } from '@stores/meal';
import { useUserStore } from '@stores/user';
import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts';
import { useTheme } from 'styled-components/native';

interface ProgressInfoProps {
  title: string;
  consumed: number;
  goal: number;
}

export const DetailsMealsDay = () => {
  const { colors, effects, fonts } = useTheme();
  const { handleInfoMealsDay } = useMeals();
  const { meals } = useMealStore();
  const { goBack } = useNavigation<NavPropsDiet>();
  const { user } = useUserStore();

  const renderProgressInfo = ({ title, consumed, goal }: ProgressInfoProps) => {
    const isMilligram = title === 'Sodio';

    return (
      <Container marginBottom={effects.spacing.lg}>
        <Container
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={effects.spacing.sm}>
          <Label fontFamily={fonts.family.medium} fontSize={fonts.size.lg}>
            {title}
          </Label>
          <Label>{`${goal.toFixed(0)} ${isMilligram ? 'mg' : 'g'}`}</Label>
        </Container>
        <ProgressBar percentage={consumed / goal} />
        <Label fontFamily={fonts.family.medium} marginTop={effects.spacing.sm}>
          {`Remain: ${(goal - consumed).toFixed(0)} ${
            isMilligram ? 'mg' : 'g'
          }`}
        </Label>
      </Container>
    );
  };

  if (!meals) {
    return <Loading />;
  }

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Detalhes"
      />

      <Scroll>
        <Container flex={1}>
          <ProgressCircle
            animate
            style={{ height: 180, marginBottom: effects.spacing.lg }}
            progress={
              handleInfoMealsDay(meals).totalKcalMeals /
              user.nutritionInfo.kcalGoal
            }
            progressColor={colors.primary[500]}
            backgroundColor={colors.primary[300]}
            strokeWidth={16}
          />
          <Label
            fontFamily={fonts.family.medium}
            fontSize={fonts.size.s1}
            textAlign="center"
            marginBottom={effects.spacing.hg}>
            {`${handleInfoMealsDay(meals).totalKcalMeals}kcal`}
          </Label>

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
          })}
          {renderProgressInfo({
            title: 'Sodio',
            consumed: handleInfoMealsDay(meals).totalSodiumMeals,
            goal: user.nutritionInfo.sodium,
          })}
        </Container>
      </Scroll>
    </Background>
  );
};
