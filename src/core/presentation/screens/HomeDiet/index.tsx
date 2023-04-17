import React, { useEffect } from 'react';
import { useUserStore } from '@core/infrastructure/store/userStore';
import { useMealStore } from '@core/infrastructure/store/mealStore';
import { useMeals } from '@core/infrastructure/hooks/useMeals';
import { useFood } from '@core/infrastructure/hooks/useFood';
import Background from '@core/presentation/shared/Background';
import ProgressBar from '@core/presentation/shared/ProgressBar';
import Link from '@core/presentation/shared/Link';
import moment from 'moment';
import Card from '@core/presentation/shared/Card';
import Button from '@core/presentation/shared/Button';
import {
  StyledAccordion,
  StyledContainerHeaderMonitoring,
  StyledDividerMonitoring,
  StyledFooterContentAccordion,
  StyledLabelGoalKcal,
  StyledLabelInfoMonitoring,
  StyledLabelRemainKcal,
  StyledLinkAddFodd,
  StyledScroll,
  StyledTitleSection,
  StyledWrapperButtonAddMeal,
  StyledWrapperMonitoring,
} from './styles';
import { MealProps } from '@core/domain/models/Meal';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@core/presentation/routes/logged';
import Loading from '@core/presentation/shared/Loading';

const HomeDiet: React.FC = () => {
  const { mealDayList } = useMealStore();
  const { fetchMealsDay, handleInfoMeal, handleInfoMealsDay, isLoading } =
    useMeals();
  const { handleFood, fetchFoods } = useFood();
  const { user } = useUserStore();
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();

  useEffect(() => {
    fetchMealsDay();
    fetchFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMonitoring = () => {
    const kcalInfo = user?.nutritionalInfo?.kcal || 0;

    if (!mealDayList) {
      return null;
    }

    return (
      <StyledWrapperMonitoring>
        <StyledContainerHeaderMonitoring>
          <StyledLabelInfoMonitoring>
            Prot
            {'\n'}
            {`${handleInfoMealsDay(mealDayList).totalProtMeals}g`}
          </StyledLabelInfoMonitoring>
          <StyledLabelInfoMonitoring>
            Carb
            {'\n'}
            {`${handleInfoMealsDay(mealDayList).totalCarbMeals}g`}
          </StyledLabelInfoMonitoring>
          <StyledLabelInfoMonitoring>
            Gord
            {'\n'}
            {`${handleInfoMealsDay(mealDayList).totalFatMeals}g`}
          </StyledLabelInfoMonitoring>
        </StyledContainerHeaderMonitoring>

        <StyledDividerMonitoring />

        <StyledLabelGoalKcal>
          {`${kcalInfo.toFixed(0)}kcal`}
        </StyledLabelGoalKcal>

        <ProgressBar
          percentage={handleInfoMealsDay(mealDayList).totalKcalMeals / kcalInfo}
        />

        <StyledLabelRemainKcal>
          {`restam: ${(
            kcalInfo - handleInfoMealsDay(mealDayList).totalKcalMeals
          ).toFixed(0)}kcal`}
        </StyledLabelRemainKcal>

        <Link
          position="flex-end"
          title="detalhes"
          onPress={() => navigateLogged('DetailsMealsDay')}
        />
      </StyledWrapperMonitoring>
    );
  };

  const renderMeal = (meal: MealProps, index: number) => {
    return (
      <StyledAccordion
        key={meal.title}
        title={meal.title}
        description={moment(new Date(meal.time.milliseconds)).format('HH:mm')}
        overview={`${handleInfoMeal(meal).totalKcal}kcal`}
        lastChild={index + 1 >= (mealDayList?.length || 0)}>
        {meal.foods.map(foodMeal => {
          return (
            <Card
              key={foodMeal.foodDoc}
              title={handleFood(foodMeal).title}
              type="none"
              description={`${handleFood(foodMeal).kcal}kcal`}
              subtitle={`${handleFood(foodMeal).quantity}g`}
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
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Background>
      <StyledScroll>
        {mealDayList && !isLoading && renderMonitoring()}

        <StyledTitleSection>Refeições</StyledTitleSection>

        {mealDayList?.map((meal, index) => renderMeal(meal, index))}

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
