import React, { useCallback, useMemo, useState } from 'react';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NavPropsLogged } from '@core/presentation/routes/logged';
import { MealProps } from '@core/domain/models/Meal';
import { firstLetterUppercase, searchData } from '@utils/helpers/help';
import { useTheme } from 'styled-components/native';
import { useFood } from '@core/infrastructure/hooks/useFood';
import { useMeasure } from '@core/infrastructure/hooks/useMeasure';
import { useToast } from '@core/infrastructure/hooks/useToast';
import { FoodProps } from '@core/domain/models/Food';
import { useFoodStore } from '@core/infrastructure/store/foodStore';
import { RefreshControl, SectionList } from 'react-native';
import Background from '@core/presentation/shared/Background';
import RoundedButton from '@core/presentation/shared/RoundedButton';
import {
  StyledCardFood,
  StyledCircle,
  StyledContainerEmptyListFood,
  StyledContent,
  StyledLabelEmptyListFood,
  StyledSearchBar,
  StyledTitleSection,
} from './styles';

type StackParamsList = {
  MealData: {
    meal: MealProps;
  };
};

const ChoseFoodToAddInMeal = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState('');
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { favoriteFoodList } = useFoodStore();
  const { fetchFoods, foodListExceptFavoriteFoods } = useFood();
  const { fetchMeasures } = useMeasure();
  const { colors } = useTheme();
  const { show: showToast } = useToast();

  const fetchAllData = useCallback(async () => {
    await fetchFoods();
    await fetchMeasures();
  }, [fetchFoods, fetchMeasures]);

  const dataFoods = [
    {
      title: 'comidas favoritas',
      data: searchData({
        search,
        data: favoriteFoodList,
        keySearch: 'name',
      }),
    },
    {
      title: 'comidas',
      data: searchData({
        search,
        data: foodListExceptFavoriteFoods(),
        keySearch: 'name',
      }),
    },
  ];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await fetchAllData();
    } catch (error) {
      showToast({ type: 'warning', message: 'something went wrong' });
    } finally {
      setRefreshing(false);
    }
  }, [fetchAllData, showToast]);

  const renderEmpty = useMemo(() => {
    return (
      <StyledContainerEmptyListFood>
        <StyledCircle />
        <StyledLabelEmptyListFood>Search not found</StyledLabelEmptyListFood>
      </StyledContainerEmptyListFood>
    );
  }, []);

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => {
    return (
      <StyledTitleSection>{`${firstLetterUppercase(
        title,
      )}`}</StyledTitleSection>
    );
  };

  const renderCardFood = ({ item }: { item: FoodProps }) => {
    return (
      <StyledCardFood
        type="bottomLine"
        title={item.name}
        description={`${(item.info.kcalPerGram * 100).toFixed(0)}kcal`}
        onPress={() =>
          navigateLogged('UpdateFoodInMeal', {
            type: 'add',
            food: item,
            meal: paramsMeal.meal,
          })
        }
      />
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Background>
      <StyledContent>
        <StyledSearchBar onChangeText={setSearch} />

        <SectionList
          sections={dataFoods}
          keyExtractor={({ doc }) => doc}
          ListEmptyComponent={renderEmpty}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderCardFood}
          refreshControl={
            <RefreshControl
              tintColor={colors.white}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </StyledContent>

      <RoundedButton
        onPress={() => navigateLogged('AddFood')}
        icon={{ name: 'plus' }}
      />
    </Background>
  );
};

export default ChoseFoodToAddInMeal;
