import React, { useCallback, useMemo } from 'react';
import { getFormatInHours } from '@utils/dateFormat';
import { NavPropsLogged } from '@routes/logged';
import { useFoods, useMeals } from '@hooks/index';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useMealStore } from '@stores/meal';
import { useTheme } from 'styled-components/native';
import {
  Accordion,
  Background,
  Button,
  Card,
  Container,
  Loading,
  Divider,
  Header,
  Label,
  ProgressBar,
  Scroll,
} from '@components/index';

export const HomeDiet = () => {
  const { effects, fonts } = useTheme();
  const { meals } = useMealStore();
  const { handleFood, getFoods } = useFoods();
  const { handleInfoMeal, handleInfoMealsDay, getMeals } = useMeals();
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();

  useFocusEffect(
    useCallback(() => {
      getMeals();
      getFoods();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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
            key={meal.title}
            title={meal.title}
            description={getFormatInHours(new Date(meal.time.milliseconds))}
            overview={`${handleInfoMeal(meal).totalKcal}kcal`}
            marginBottom={
              index + 1 >= meals.length
                ? effects.spacing.hg
                : effects.spacing.lg
            }>
            {meal.foods.map(foodMeal => {
              return (
                <Card
                  key={foodMeal.foodDoc}
                  title={handleFood(foodMeal).title}
                  type="none"
                  description={handleFood(foodMeal).kcal}
                  subtitle={handleFood(foodMeal).quantity}
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
