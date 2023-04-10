import React, { useEffect } from 'react';
import { IFood } from '@services/firebase/models/food';
import { useNavigation } from '@react-navigation/native';
import { useFavorite } from '@hooks/index';
import { TouchableOpacity } from 'react-native';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { Background, Header } from '@components/index';
import {
  StyledCardFood,
  StyledDraggableFlatList,
  StyledDescription,
} from './styles';

const Favorites = () => {
  const { favoritesFoodsList, setFavoritesFoodsList, getFavoritesFoods } =
    useFavorite();
  const { goBack } = useNavigation();

  useEffect(() => {
    setFavoritesFoodsList(getFavoritesFoods);
  }, [getFavoritesFoods, setFavoritesFoodsList]);

  const renderHeaderList = () => {
    return (
      <StyledDescription>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </StyledDescription>
    );
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<IFood>) => {
    return (
      <ScaleDecorator activeScale={1.025} key={item.doc}>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <StyledCardFood
            title={item.name}
            icon={{ name: 'handle', size: 24 }}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Comidas favoritas"
      />

      <StyledDraggableFlatList
        data={favoritesFoodsList}
        keyExtractor={({ doc }) => doc}
        ListHeaderComponent={renderHeaderList}
        renderItem={renderItem}
        onDragEnd={({ data }) => setFavoritesFoodsList(data)}
      />
    </Background>
  );
};

export default Favorites;
