import React, { useEffect } from 'react';
import { IFood } from '@services/firebase/models/food';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@hooks/index';
import { TouchableOpacity } from 'react-native';
import { useFoodStore, useUserStore } from '@stores/index';
import { Background, Button, Header } from '@components/index';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {
  StyledCardFood,
  StyledDraggableFlatList,
  StyledDescription,
  StyledWrapperButtonSubmit,
} from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Favorites = () => {
  const { favoriteFoods, setFavoriteFoods } = useFoodStore();
  const { goBack } = useNavigation();
  const { updateUser } = useUser();
  const { user } = useUserStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setFavoriteFoods(favoriteFoods);
  }, [favoriteFoods, setFavoriteFoods]);

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
        data={favoriteFoods}
        keyExtractor={({ doc }) => doc}
        ListHeaderComponent={renderHeaderList}
        renderItem={renderItem}
        onDragEnd={({ data }) => {
          const foodData = data as unknown as IFood[];
          setFavoriteFoods(foodData);
        }}
      />

      <StyledWrapperButtonSubmit insets={insets}>
        <Button
          title={'Salvar'}
          onPress={async () => {
            await updateUser({
              preferences: {
                ...user.preferences,
                favoritesFoods: favoriteFoods.map(food => food.doc),
              },
            });

            goBack();
          }}
        />
      </StyledWrapperButtonSubmit>
    </Background>
  );
};

export default Favorites;
