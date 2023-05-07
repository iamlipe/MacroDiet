import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { MealProps } from '@/core/domain/models/Meal';
import { SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '../../routes/logged';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useFoodStore } from '@/core/infrastructure/store/foodStore';
import { useFood } from '@/core/infrastructure/hooks/useFood';
import { useMealStore } from '@/core/infrastructure/store/mealStore';
import { useMeals } from '@/core/infrastructure/hooks/useMeals';
import { firstLetterUppercase, searchData } from '@/utils/helpers/help';
import { FoodProps } from '@/core/domain/models/Food';
import { excludeFavoriteFoods } from '@/utils/helpers/handleFood';
import {
  StyledAccordion,
  StyledCardFood,
  StyledContainerLoadingSearchFoods,
  StyledContent,
  StyledDescriptionEmptyListFood,
  StyledLabelEmptyListFood,
  StyledLabelLoadingSearchFoods,
  StyledSearchBar,
  StyledTitleSection,
} from './styles';
import Card from '../../shared/Card';

interface ChoseFoodToAddInMealViewProps {
  meal?: MealProps;
}

const ChoseFoodToAddInMealView: React.FC<ChoseFoodToAddInMealViewProps> = ({
  meal,
}) => {
  const [search, setSearch] = useState('');
  const [pageFoods, setPageFoods] = useState(0);
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();
  const { favoriteFoodList, searchFoodList, foodList } = useFoodStore();
  const { handleFood, fetchSearchFoods, isLoading } = useFood();
  const { mealDayList } = useMealStore();
  const { handleInfoMeal } = useMeals();

  useEffect(() => {
    if (search.length >= 3) {
      setTimeout(() => {
        fetchSearchFoods(search);
      }, 250);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const selectedMeal = useMemo(
    () => (meal ? mealDayList?.find(item => item.doc === meal.doc) : null),
    [meal, mealDayList],
  );

  const foodListExcludeFavoriteFoods = useMemo(() => {
    const endAt = pageFoods * 20 + 20;

    return excludeFavoriteFoods(
      foodList?.slice(0, endAt) || [],
      user?.preferences?.favoritesFoods || [],
    );
  }, [foodList, pageFoods, user?.preferences?.favoritesFoods]);

  const foodSearchListExcludeFavoriteFoods = useMemo(() => {
    const endAt = pageFoods * 20 + 20;

    return excludeFavoriteFoods(
      searchFoodList?.slice(0, endAt) || [],
      user?.preferences?.favoritesFoods || [],
    );
  }, [pageFoods, searchFoodList, user?.preferences?.favoritesFoods]);

  const dataFoods = useMemo(
    () => [
      {
        title: 'favoritas',
        data:
          search.length >= 3
            ? searchData({
                search,
                data: favoriteFoodList,
                keySearch: 'name',
              })
            : favoriteFoodList || [],
      },
      {
        title: 'comidas',
        data:
          search.length >= 3
            ? foodSearchListExcludeFavoriteFoods
            : foodListExcludeFavoriteFoods,
      },
    ],
    [
      favoriteFoodList,
      foodListExcludeFavoriteFoods,
      foodSearchListExcludeFavoriteFoods,
      search,
    ],
  );

  const navigateToUpdateFood = (item: FoodProps) => {
    if (selectedMeal) {
      navigateLogged('UpdateFoodInMeal', {
        type: 'add',
        food: item,
        meal: selectedMeal,
      });
    }
  };

  const renderEmpty = () => (
    <React.Fragment>
      <StyledLabelEmptyListFood>Busca nao encontrada</StyledLabelEmptyListFood>
      <StyledDescriptionEmptyListFood>
        Não encontramos nenhum resultado para a sua pesquisa. Tente utilizar
        outro termo
      </StyledDescriptionEmptyListFood>
    </React.Fragment>
  );

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <StyledTitleSection>{`${firstLetterUppercase(
      section.title,
    )}`}</StyledTitleSection>
  );

  const renderCardFood = ({ item }: { item: FoodProps }) => (
    <StyledCardFood
      type="bottomLine"
      title={item.name}
      description={`${(item.info.kcalPerGram * 100).toFixed(0)}kcal`}
      onPress={() => {
        navigateToUpdateFood(item);
      }}
    />
  );

  if (!meal) return null;

  return (
    <StyledContent>
      <StyledAccordion
        title={meal.title}
        description={moment(new Date(meal?.time.milliseconds)).format('HH:mm')}
        overview={`${handleInfoMeal(meal).totalKcal}kcal`}>
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
      </StyledAccordion>

      <StyledSearchBar onChangeText={setSearch} />

      {isLoading ? (
        <StyledContainerLoadingSearchFoods>
          <StyledLabelLoadingSearchFoods>
            Carregando...
          </StyledLabelLoadingSearchFoods>
        </StyledContainerLoadingSearchFoods>
      ) : (
        <SectionList
          sections={dataFoods.filter(item => item.data?.length)}
          keyExtractor={({ doc }) => doc}
          ListEmptyComponent={renderEmpty}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderCardFood}
          onEndReached={() => {
            setPageFoods(pageFoods + 1);
          }}
        />
      )}
    </StyledContent>
  );
};

export default ChoseFoodToAddInMealView;
