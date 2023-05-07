import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { FoodProps } from '@/core/domain/models/Food';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { useFoodStore } from '@/core/infrastructure/store/foodStore';
import Button from '@/core/presentation/shared/Button';
import Loading from '@/core/presentation/shared/Loading';
import {
  StyledCardFood,
  StyledDraggableFlatList,
  StyledDescription,
  StyledWrapperButtonSubmit,
} from './styles';

const FavoriteFoodsView = () => {
  const { favoriteFoodList, setFavoriteFoodList } = useFoodStore();
  const { goBack } = useNavigation();
  const { updateUser } = useUser();
  const { user } = useUserStore();
  const insets = useSafeAreaInsets();

  const onSave = async () => {
    if (user?.preferences && favoriteFoodList) {
      await updateUser({
        preferences: {
          ...user?.preferences,
          favoritesFoods: favoriteFoodList.map(food => food.doc),
        },
      });
    }

    goBack();
  };

  const renderHeaderList = () => {
    return (
      <StyledDescription>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </StyledDescription>
    );
  };

  return (
    <React.Fragment>
      {favoriteFoodList ? (
        <StyledDraggableFlatList
          data={favoriteFoodList}
          keyExtractor={item => {
            const food = item as unknown as FoodProps;
            return food.doc;
          }}
          ListHeaderComponent={renderHeaderList}
          renderItem={({ drag, isActive, item }) => {
            const food = item as FoodProps;

            return (
              <ScaleDecorator activeScale={1.025} key={food.doc}>
                <TouchableOpacity onLongPress={drag} disabled={isActive}>
                  <StyledCardFood
                    title={food.name}
                    icon={{ name: 'handle', size: 24 }}
                  />
                </TouchableOpacity>
              </ScaleDecorator>
            );
          }}
          onDragEnd={({ data }) => {
            const foodData = data as unknown as FoodProps[];
            setFavoriteFoodList(foodData);
          }}
        />
      ) : (
        <Loading />
      )}

      <StyledWrapperButtonSubmit insets={insets}>
        <Button title={'Salvar'} onPress={onSave} />
      </StyledWrapperButtonSubmit>
    </React.Fragment>
  );
};

export default FavoriteFoodsView;
