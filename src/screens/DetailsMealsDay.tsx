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
import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts';
import { useTheme } from 'styled-components/native';

interface ProgressInfoProps {
  title: string;
  progressBar?: boolean;
}

export const DetailsMealsDay = () => {
  const { colors, effects, fonts } = useTheme();
  const { handleInfoMealsDay } = useMeals();
  const { meals } = useMealStore();
  const { goBack } = useNavigation<NavPropsDiet>();

  const renderProgressInfo = ({
    title,
    progressBar = true,
  }: ProgressInfoProps) => {
    if (!progressBar) {
      return (
        <Container flexDirection="row" marginBottom={effects.spacing.lg}>
          <Label fontFamily={fonts.family.medium}>{`${title} 20g`}</Label>
        </Container>
      );
    }

    return (
      <Container marginBottom={effects.spacing.lg}>
        <Container
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={effects.spacing.sm}>
          <Label fontFamily={fonts.family.medium} fontSize={fonts.size.lg}>
            {title}
          </Label>
          <Label>200kcal</Label>
        </Container>
        <ProgressBar />
        <Label fontFamily={fonts.family.medium} marginTop={effects.spacing.sm}>
          Remain: 200kcal
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
        title="Overview"
      />

      <Scroll>
        <Container flex={1}>
          <ProgressCircle
            animate
            style={{ height: 180, marginBottom: effects.spacing.lg }}
            progress={0.7}
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

          {renderProgressInfo({ title: 'Proteina' })}
          {renderProgressInfo({ title: 'Carboidrato' })}
          {renderProgressInfo({ title: 'Gordura' })}
          {renderProgressInfo({ title: 'Fibra', progressBar: false })}
          {renderProgressInfo({ title: 'Sodio', progressBar: false })}
        </Container>
      </Scroll>
    </Background>
  );
};
