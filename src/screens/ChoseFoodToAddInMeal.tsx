import { Background } from '@components/Backgroud';
import { Card } from '@components/Card';
import { Container } from '@components/Container';
import { Header } from '@components/Header';
import { Label } from '@components/Label';
import { SearchBar } from '@components/SearchBar';
import { useFoods } from '@hooks/useFoods';
import { useSearch } from '@hooks/useSearch';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { IFood } from '@services/firebase/models/food';
import { IMeal } from '@services/firebase/models/meal';
import { FlashList } from '@shopify/flash-list';
import { useFoodStore } from '@stores/food';
import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';

type StackParamsList = {
  MealData: {
    meal: IMeal;
  };
};

export const ChoseFoodToAddInMeal = () => {
  const [search, setSearch] = useState('');
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { goBack, navigate: navigateDiet } = useNavigation<NavPropsLogged>();
  const { foods } = useFoodStore();
  const { colors, fonts, effects } = useTheme();
  const { handleSearch } = useSearch<IFood>();
  useFoods({ shouldUpdateStore: true });

  const renderEmpty = () => {
    return (
      <Container flexGrow={1} alignItems="center" justifyContent="center">
        <Container
          width={100}
          height={100}
          borderRadius={effects.border.radius.circular}
          backgroundColor={colors.primary[300]}
          marginBottom={effects.spacing.lg}
        />

        <Label fontFamily={fonts.family.medium} fontSize={fonts.size.s2}>
          Search not found
        </Label>
      </Container>
    );
  };

  const renderCardFood = ({ item }) => {
    return (
      <Card
        type="bottomLine"
        title={item.name}
        description={`${(item.info.kcalPerGram * 100).toFixed(0)}kcal\n100g`}
        marginBottom={effects.spacing.md}
        onPress={() =>
          navigateDiet('UpdateFoodInMeal', {
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
        title="Detalhes refeição"
      />

      <Container
        flex={1}
        paddingHorizontal={effects.spacing.md}
        paddingVertical={effects.spacing.vl}>
        <SearchBar onChangeText={setSearch} marginBottom={effects.spacing.hg} />

        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.lg}>
          Comidas
        </Label>

        <FlashList
          data={handleSearch({
            search,
            data: foods,
            keySearch: 'name',
          })}
          estimatedItemSize={40}
          keyExtractor={({ id }) => id}
          ListEmptyComponent={renderEmpty()}
          renderItem={renderCardFood}
        />
      </Container>
    </Background>
  );
};
