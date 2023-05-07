import React, { useEffect } from 'react';
import { useFoodStore } from '@/core/infrastructure/store/foodStore';
import Background from '@/core/presentation/shared/Background';
import FavoriteFoodsView from './FavoriteFoods.view';

const Favorites = () => {
  const { favoriteFoodList, setFavoriteFoodList } = useFoodStore();

  useEffect(() => {
    if (favoriteFoodList) {
      setFavoriteFoodList(favoriteFoodList);
    }
  }, [favoriteFoodList, setFavoriteFoodList]);

  return (
    <Background>
      <FavoriteFoodsView />
    </Background>
  );
};

export default Favorites;
