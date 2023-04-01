import React from 'react';
import { Background } from '@components/Backgroud';
import { Header } from '@components/Header';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { Card } from '@components/Card';
import { TouchableOpacity } from 'react-native';
import { IFood } from '@services/firebase/models/food';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Label } from '@components/Label';
import { useFavorite } from '@hooks/useFavorite';

export const Favorites = () => {
  const { favoritesFoods, setFavoritesFoods } = useFavorite();
  const { goBack } = useNavigation();
  const { effects, fonts } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const renderHeaderList = () => {
    return (
      <Label
        fontFamily={fonts.family.medium}
        fontSize={fonts.size.s1}
        color={fonts.color.secundary}
        marginBottom={effects.spacing.vl}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Label>
    );
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<IFood>) => {
    return (
      <ScaleDecorator activeScale={1.025} key={item.id}>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <Card
            title={item.name}
            marginBottom={effects.spacing.md}
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

      <DraggableFlatList
        data={favoritesFoods}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={renderHeaderList}
        renderItem={renderItem}
        onDragEnd={({ data }) => setFavoritesFoods(data)}
        contentContainerStyle={{
          paddingHorizontal: effects.spacing.md,
          paddingVertical: effects.spacing.vl,
          marginBottom: bottom,
        }}
        containerStyle={{ marginBottom: bottom }}
        style={{ marginBottom: bottom }}
      />
    </Background>
  );
};
