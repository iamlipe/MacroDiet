import React, { useCallback, useMemo, useState } from 'react';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useFoods, useMeasures, useSearch, useToast } from '@hooks/index';
import { NavPropsLogged } from '@routes/logged';
import { IFood } from '@services/firebase/models/food';
import { IMeal } from '@services/firebase/models/meal';
import { useFoodStore } from '@stores/index';
import { RoundedButton, Header, Background } from '@components/index';
import { RefreshControl, SectionList } from 'react-native';
import {
  StyledCardFood,
  StyledCircle,
  StyledContainerEmptyListFood,
  StyledContent,
  StyledLabelEmptyListFood,
  StyledSearchBar,
  StyledTitleSection,
} from './styles';
import { firstLetterUppercase } from '@utils/stringFormat';
import { useTheme } from 'styled-components/native';

type StackParamsList = {
  MealData: {
    meal: IMeal;
  };
};

const ChoseFoodToAddInMeal = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState('');
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { goBack, navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { foods, favoriteFoods } = useFoodStore();
  const { handleSearch } = useSearch<IFood>();
  const { getFoods, getFavoritesFood } = useFoods();
  const { getMeasures } = useMeasures();
  const { colors } = useTheme();
  const { show: showToast } = useToast();

  const fetchAllData = useCallback(async () => {
    await getFoods();
    await getFavoritesFood();
    await getMeasures();
  }, [getFavoritesFood, getFoods, getMeasures]);

  const dataFoods = [
    {
      title: 'comidas favoritas',
      data: handleSearch({
        search,
        data: favoriteFoods,
        keySearch: 'name',
      }),
    },
    {
      title: 'comidas',
      data: handleSearch({
        search,
        data: foods,
        keySearch: 'name',
      }),
    },
  ];

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
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

  const renderSectionHeader = ({ section: { title } }) => {
    return (
      <StyledTitleSection>{`${firstLetterUppercase(
        title,
      )}`}</StyledTitleSection>
    );
  };

  const renderCardFood = ({ item }) => {
    return (
      <StyledCardFood
        type="bottomLine"
        title={item.name}
        description={`${(item.info.kcalPerGram * 100).toFixed(0)}kcal\n100g`}
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
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Adicionar"
      />

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
