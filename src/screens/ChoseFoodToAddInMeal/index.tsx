import React, { useCallback, useState } from 'react';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useFoods, useMeasures, useSearch } from '@hooks/index';
import { NavPropsLogged } from '@routes/logged';
import { IFood } from '@services/firebase/models/food';
import { IMeal } from '@services/firebase/models/meal';
import { useFoodStore } from '@stores/index';
import { FlashList } from '@shopify/flash-list';
import { RoundedButton, Header, Background } from '@components/index';
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
    meal: IMeal;
  };
};

const ChoseFoodToAddInMeal = () => {
  const [search, setSearch] = useState('');
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { goBack, navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { foods } = useFoodStore();
  const { handleSearch } = useSearch<IFood>();
  const { getFoods } = useFoods();
  const { getMeasures } = useMeasures();

  useFocusEffect(
    useCallback(() => {
      getFoods();
      getMeasures();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const renderEmpty = () => {
    return (
      <StyledContainerEmptyListFood>
        <StyledCircle />

        <StyledLabelEmptyListFood>Search not found</StyledLabelEmptyListFood>
      </StyledContainerEmptyListFood>
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

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Adicionar"
      />

      <StyledContent>
        <StyledSearchBar onChangeText={setSearch} />

        <StyledTitleSection>Comidas</StyledTitleSection>

        <FlashList
          data={handleSearch({
            search,
            data: foods,
            keySearch: 'name',
          })}
          estimatedItemSize={40}
          keyExtractor={({ doc }) => doc}
          ListEmptyComponent={renderEmpty()}
          renderItem={renderCardFood}
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
