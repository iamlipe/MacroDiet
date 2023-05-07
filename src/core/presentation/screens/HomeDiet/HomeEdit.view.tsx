import React from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useMeals } from '@/core/infrastructure/hooks/useMeals';
import { useMealStore } from '@/core/infrastructure/store/mealStore';
import { useWaterStore } from '@/core/infrastructure/store/waterStore';
import { MealProps } from '@/core/domain/models/Meal';
import { useFood } from '@/core/infrastructure/hooks/useFood';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from 'react-native-google-mobile-ads';
import {
  StyledScroll,
  StyledWrapperButtonAddMeal,
  // StyledContainerBannerAD,
  StyledWrapperMonitoring,
  StyledContainerHeaderMonitoring,
  StyledLabelInfoMonitoring,
  StyledDividerMonitoring,
  StyledLabelGoalKcal,
  StyledLabelRemainKcal,
  StyledContainerDrinkWater,
  StyledHeaderDrinkWater,
  StyledTitleDrinkWater,
  StyledLabelGoalDrinkWater,
  StyledAccordion,
  StyledFooterContentAccordion,
  StyledLinkAddFodd,
  StyledTitleSection,
  StyledContainerEmptyMealDayList,
  StyledTextEmptyMealDayList,
  StyledLinkAddWater,
} from './styles';
import Button from '@/core/presentation/shared/Button';
import ProgressBar from '../../shared/ProgressBar';
import Link from '../../shared/Link';
import Card from '../../shared/Card';

const HomeDietView: React.FC = () => {
  const { mealDayList } = useMealStore();
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { handleInfoMealsDay, handleInfoMeal } = useMeals();
  const { handleFood } = useFood();
  const { user } = useUserStore();
  const { waterDay } = useWaterStore();

  const kcalInfo = user?.nutritionalInfo?.kcal || 0;

  const renderMeal = (meal: MealProps, index: number) => {
    return (
      <StyledAccordion
        key={meal.doc}
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

  return (
    <StyledScroll>
      <StyledWrapperMonitoring>
        <StyledContainerHeaderMonitoring>
          <StyledLabelInfoMonitoring>
            Prot
            {'\n'}
            {`${
              mealDayList ? handleInfoMealsDay(mealDayList).totalProtMeals : 0
            }g`}
          </StyledLabelInfoMonitoring>
          <StyledLabelInfoMonitoring>
            Carb
            {'\n'}
            {`${
              mealDayList ? handleInfoMealsDay(mealDayList).totalCarbMeals : 0
            }g `}
          </StyledLabelInfoMonitoring>
          <StyledLabelInfoMonitoring>
            Gord
            {'\n'}
            {`${
              mealDayList ? handleInfoMealsDay(mealDayList).totalFatMeals : 0
            }g`}
          </StyledLabelInfoMonitoring>
        </StyledContainerHeaderMonitoring>

        <StyledDividerMonitoring />

        <StyledLabelGoalKcal>{`${kcalInfo.toFixed(
          0,
        )}kcal`}</StyledLabelGoalKcal>

        <ProgressBar
          percentage={
            mealDayList
              ? handleInfoMealsDay(mealDayList).totalKcalMeals / kcalInfo
              : 0
          }
        />

        <StyledLabelRemainKcal>
          {`Restam: ${(mealDayList
            ? kcalInfo - handleInfoMealsDay(mealDayList).totalKcalMeals
            : 0
          ).toFixed(0)}kcal`}
        </StyledLabelRemainKcal>

        <Link
          position="flex-end"
          title="Detalhes"
          onPress={() => navigateLogged('DetailsMealsDay')}
        />
      </StyledWrapperMonitoring>

      <StyledContainerDrinkWater>
        <StyledHeaderDrinkWater>
          <StyledTitleDrinkWater>Água</StyledTitleDrinkWater>

          <StyledLabelGoalDrinkWater>
            {`${waterDay?.quantity}/${waterDay?.goal}`}ml
          </StyledLabelGoalDrinkWater>
        </StyledHeaderDrinkWater>

        <ProgressBar
          percentage={(waterDay?.quantity || 0) / (waterDay?.goal || 0)}
        />

        <StyledLinkAddWater
          title={'Adicionar'}
          position="flex-end"
          onPress={() => navigateLogged('DrinkWater')}
        />
      </StyledContainerDrinkWater>

      {/* <StyledContainerBannerAD>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </StyledContainerBannerAD> */}

      <React.Fragment>
        <StyledTitleSection>Refeições</StyledTitleSection>

        {!mealDayList?.length ? (
          <StyledContainerEmptyMealDayList>
            <StyledTextEmptyMealDayList>
              Nenhuma refeicao foi encontrada
            </StyledTextEmptyMealDayList>
          </StyledContainerEmptyMealDayList>
        ) : (
          mealDayList?.map((meal, index) => renderMeal(meal, index))
        )}
      </React.Fragment>

      <StyledWrapperButtonAddMeal>
        <Button
          title="Adicionar refeição"
          icon={{ name: 'plus' }}
          onPress={() => navigateLogged('AddMeal')}
        />
      </StyledWrapperButtonAddMeal>
    </StyledScroll>
  );
};

export default HomeDietView;
