import React, { useMemo } from 'react';
import { Accordion } from '@components/Accordion';
import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Container } from '@components/Container';
import { Loading } from '@components/Loading';
import { Divider } from '@components/Divider';
import { Header } from '@components/Header';
import { Label } from '@components/Label';
import { ProgressBar } from '@components/ProgressBar';
import { Scroll } from '@components/Scroll';
import { useFoods } from '@hooks/useFoods';
import { useMeals } from '@hooks/useMeals';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { useMealStore } from '@stores/meal';
import { getFormatInHours } from '@utils/dateFormat';
import { useTheme } from 'styled-components/native';
import { useNotification } from '@hooks/useNotification';

export const HomeDiet = () => {
  useNotification({ scheduleMealsNotificationToNextDays: 3 });
  const { effects, fonts } = useTheme();
  const { meals } = useMealStore();
  const { handleFood } = useFoods({ shouldUpdateStore: false });
  const { handleInfoMeal, handleInfoMealsDay } = useMeals({
    shouldUpdateStore: true,
  });
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();

  const renderMonitoringMealsDay = useMemo(() => {
    if (!meals) {
      return (
        <Container
          minHeight={220}
          padding={effects.spacing.lg}
          marginBottom={effects.spacing.hg}>
          <Loading />
        </Container>
      );
    }

    return (
      <Container
        minHeight={220}
        padding={effects.spacing.lg}
        marginBottom={effects.spacing.hg}>
        <Container flexDirection="row" justifyContent="space-around">
          <Label
            textAlign="center"
            fontFamily={fonts.family.medium}
            fontSize={fonts.size.s2}>
            Prot
            {'\n'}
            {`${handleInfoMealsDay(meals).totalProtMeals}g`}
          </Label>
          <Label
            textAlign="center"
            fontFamily={fonts.family.medium}
            fontSize={fonts.size.s2}>
            Carb
            {'\n'}
            {`${handleInfoMealsDay(meals).totalCarbMeals}g`}
          </Label>
          <Label
            textAlign="center"
            fontFamily={fonts.family.medium}
            fontSize={fonts.size.s2}>
            Gord
            {'\n'}
            {`${handleInfoMealsDay(meals).totalFatMeals}g`}
          </Label>
        </Container>

        <Divider
          marginBottom={effects.spacing.lg}
          marginTop={effects.spacing.lg}
        />

        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.md}
          textAlign="right"
          marginBottom={effects.spacing.md}>
          2000kcal
        </Label>

        <ProgressBar />

        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.md}
          marginTop={effects.spacing.md}>
          {`restam: ${handleInfoMealsDay(meals).totalKcalMeals}kcal`}
        </Label>

        <Button
          type="link"
          linkPosition="flex-end"
          title="detalhes"
          onPress={() => navigateLogged('DetailsMealsDay')}
        />
      </Container>
    );
  }, [
    effects.spacing.hg,
    effects.spacing.lg,
    effects.spacing.md,
    fonts.family.medium,
    fonts.size.md,
    fonts.size.s2,
    handleInfoMealsDay,
    meals,
    navigateLogged,
  ]);

  return (
    <Background>
      <Header title="Dieta" />

      <Scroll>
        {renderMonitoringMealsDay}

        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.lg}>
          Refeiçoes
        </Label>

        {meals?.map((meal, index) => (
          <Accordion
            key={meal.id}
            title={meal.title}
            description={getFormatInHours(new Date(meal.time.milliseconds))}
            overview={`${handleInfoMeal(meal).totalKcal}kcal`}
            marginBottom={
              index + 1 >= meals.length
                ? effects.spacing.hg
                : effects.spacing.lg
            }>
            {meal.foods.map(food => {
              return (
                <Card
                  key={`food-${food.foodId}`} // NOTE: somar foods com mesmo id
                  title={handleFood(food).title}
                  type="none"
                  description={handleFood(food).kcal}
                  subtitle={handleFood(food).quantity}
                  marginBottom={effects.spacing.sm}
                />
              );
            })}

            <Container flexDirection="row" justifyContent="flex-end">
              <Button
                title="Editar"
                type="link"
                onPress={() => navigateLogged('EditMeal', { meal })}
              />
              <Button
                title="Adicionar"
                type="link"
                marginLeft={effects.spacing.sm}
                onPress={() => navigateLogged('ChoseFoodToAddInMeal', { meal })}
              />
            </Container>
          </Accordion>
        ))}

        <Container flex={1} justifyContent="flex-end">
          <Button
            title="Adicionar refeição"
            onPress={() => navigateLogged('AddMeal')}
          />
        </Container>
      </Scroll>
    </Background>
  );
};
