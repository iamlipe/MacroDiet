import React, { useCallback, useEffect } from 'react';
import { NavPropsLogged } from '@routes/logged';
import { useFoods, useMeals } from '@hooks/index';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useMealStore, useUserStore } from '@stores/index';
import {
  Background,
  Button,
  Card,
  Loading,
  Header,
  ProgressBar,
  Link,
} from '@components/index';
import {
  StyledScroll,
  StyledWrapperMonitoring,
  StyledContainerHeaderMonitoring,
  StyledLabelInfoMonitoring,
  StyledDividerMonitoring,
  StyledLabelGoalKcal,
  StyledLabelRemainKcal,
  StyledTitleSection,
  StyledAccordion,
  StyledFooterContentAccordion,
  StyledLinkAddFodd,
  StyledWrapperButtonAddMeal,
} from './styles';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const HomeDiet = () => {
  const { user } = useUserStore();
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

      <StyledScroll>
        {meals && !loadingMeals && (
          <StyledWrapperMonitoring>
            <StyledContainerHeaderMonitoring>
              <StyledLabelInfoMonitoring>
                Prot
                {'\n'}
                {`${handleInfoMealsDay(meals).totalProtMeals}g`}
              </StyledLabelInfoMonitoring>
              <StyledLabelInfoMonitoring>
                Carb
                {'\n'}
                {`${handleInfoMealsDay(meals).totalCarbMeals}g`}
              </StyledLabelInfoMonitoring>
              <StyledLabelInfoMonitoring>
                Gord
                {'\n'}
                {`${handleInfoMealsDay(meals).totalFatMeals}g`}
              </StyledLabelInfoMonitoring>
            </StyledContainerHeaderMonitoring>

            <StyledDividerMonitoring />

            <StyledLabelGoalKcal>
              {`${user.nutritionalInfo.kcal.toFixed(0)}kcal`}
            </StyledLabelGoalKcal>

            <ProgressBar
              percentage={
                handleInfoMealsDay(meals).totalKcalMeals /
                user.nutritionalInfo.kcal
              }
            />

            <StyledLabelRemainKcal>
              {`restam: ${(
                user.nutritionalInfo.kcal -
                handleInfoMealsDay(meals).totalKcalMeals
              ).toFixed(0)}kcal`}
            </StyledLabelRemainKcal>

            <Link
              position="flex-end"
              title="detalhes"
              onPress={() => navigateLogged('DetailsMealsDay')}
            />
          </StyledWrapperMonitoring>
        )}

        <StyledTitleSection>Refeiçoes</StyledTitleSection>

        {meals?.map((meal, index) => (
          <StyledAccordion
            key={meal.title}
            title={meal.title}
            description={moment(new Date(meal.time.milliseconds)).format(
              'HH:mm',
            )}
            overview={`${handleInfoMeal(meal).totalKcal}kcal`}
            lastChild={index + 1 >= meals.length}>
            {meal.foods.map(foodMeal => {
              return (
                <Card
                  key={foodMeal.foodDoc}
                  title={handleFood(foodMeal).title}
                  type="none"
                  description={handleFood(foodMeal).kcal}
                  subtitle={handleFood(foodMeal).quantity}
                />
              );
            })}

            <StyledFooterContentAccordion>
              <Link
                title="Editar"
                onPress={() => navigateLogged('EditMeal', { meal })}
              />
              <StyledLinkAddFodd
                title="Adicionar"
                onPress={() => navigateLogged('ChoseFoodToAddInMeal', { meal })}
              />
            </StyledFooterContentAccordion>
          </StyledAccordion>
        ))}

        <StyledWrapperButtonAddMeal>
          <Button
            title="Adicionar refeição"
            onPress={() => navigateLogged('AddMeal')}
          />
        </StyledWrapperButtonAddMeal>
      </StyledScroll>
    </Background>
  );
};

export default HomeDiet;
