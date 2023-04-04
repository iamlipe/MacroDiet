import { useUserStore } from '@stores/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFoods } from './useFoods';

export const useFavorite = () => {
  const [favoritesFoods, setFavoritesFoods] = useState([]);
  const { user } = useUserStore();
  const { getFood } = useFoods();

  const handleFavorite = useCallback(() => {}, []);

  const getFavoritesFoods = useMemo(() => {
    return user.preferences.favoritesFoods.map(foodDoc => getFood(foodDoc));
  }, [getFood, user.preferences.favoritesFoods]);

  useEffect(() => {
    setFavoritesFoods(getFavoritesFoods);
  }, [getFavoritesFoods]);

  return {
    handleFavorite,
    favoritesFoods,
    getFavoritesFoods,
    setFavoritesFoods,
  };
};
