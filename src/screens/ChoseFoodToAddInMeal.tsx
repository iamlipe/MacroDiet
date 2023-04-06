import React, { useCallback, useState } from 'react';
import { Background } from '@components/Backgroud';
import { Card } from '@components/Card';
import { Container } from '@components/Container';
import { Header } from '@components/Header';
import { Label } from '@components/Label';
import { SearchBar } from '@components/SearchBar';
import { useFoods, useMeasures, useSearch } from '@hooks/index';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { IFood } from '@services/firebase/models/food';
import { IMeal } from '@services/firebase/models/meal';
import { FlashList } from '@shopify/flash-list';
import { useFoodStore } from '@stores/food';
import { useTheme } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type StackParamsList = {
  MealData: {
    meal: IMeal;
  };
};

export const ChoseFoodToAddInMeal = () => {
  const [search, setSearch] = useState('');
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { goBack, navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { foods } = useFoodStore();
  const { colors, fonts, effects } = useTheme();
  const { handleSearch } = useSearch<IFood>();
  const { bottom } = useSafeAreaInsets();
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
          keyExtractor={({ doc }) => doc}
          ListEmptyComponent={renderEmpty()}
          renderItem={renderCardFood}
        />
      </Container>

      <TouchableOpacity
        onPress={() => navigateLogged('AddFood')}
        style={{
          height: 72,
          width: 72,
          borderRadius: 36,
          backgroundColor: colors.primary[600],
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: bottom + effects.spacing.hg,
          right: effects.spacing.lg,
        }}>
        <Label fontSize={40} fontFamily={fonts.family.medium} marginTop={-4}>
          +
        </Label>
      </TouchableOpacity>
    </Background>
  );
};
