import React, { useCallback, useEffect } from 'react';
import { getFormatInHours } from '@utils/dateFormat';
import { NavPropsLogged } from '@routes/logged';
import { useFoods, useMeals } from '@hooks/index';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { useUserStore } from '@stores/user';
import auth from '@react-native-firebase/auth';

export const HomeDiet = () => {
  const { user } = useUserStore();
  const { effects, fonts } = useTheme();
  const { meals } = useMealStore();
  const { handleFood, getFoods, loading: loadingFoods } = useFoods();
  const {
    handleInfoMeal,
    handleInfoMealsDay,
    getMeals,
    loading: loadingMeals,
  } = useMeals();
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();

  useFocusEffect(
    useCallback(() => {
      getMeals({ user, userDoc: auth().currentUser.uid });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    getFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!meals || loadingMeals || loadingFoods) {
    return <Loading />;
  }

  return (
    <Background>
      <Header hasLogo={true} />

      <Scroll>
        {meals && !loadingMeals && (
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
              {`${user.nutritionInfo.kcalGoal.toFixed(0)}kcal`}
            </Label>

            <ProgressBar
              percentage={
                handleInfoMealsDay(meals).totalKcalMeals /
                user.nutritionInfo.kcalGoal
              }
            />

            <Label
              fontFamily={fonts.family.medium}
              fontSize={fonts.size.md}
              marginTop={effects.spacing.md}>
              {`restam: ${(
                user.nutritionInfo.kcalGoal -
                handleInfoMealsDay(meals).totalKcalMeals
              ).toFixed(0)}kcal`}
            </Label>

            <Button
              type="link"
              linkPosition="flex-end"
              title="detalhes"
              onPress={() => navigateLogged('DetailsMealsDay')}
            />
          </Container>
        )}

        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.lg}>
          Refeiçoes
        </Label>

        {!meals?.length ? (
          <Label>Vai se fude react</Label>
        ) : (
          meals.map((meal, index) => (
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
                  onPress={() =>
                    navigateLogged('ChoseFoodToAddInMeal', { meal })
                  }
                />
              </Container>
            </Accordion>
          ))
        )}

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
