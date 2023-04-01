import { useUserStore } from '@stores/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFoods } from './useFoods';

export const useFavorite = () => {
  const [favoritesFoods, setFavoritesFoods] = useState([]);
  const { user } = useUserStore();
  const { getFoodById } = useFoods({ shouldUpdateStore: true });

  const handleFavorite = useCallback(() => {}, []);

  const getFavoritesFoods = useMemo(() => {
    return user.preferences.favoritesFoods.map(id => getFoodById(id));
  }, [getFoodById, user.preferences.favoritesFoods]);

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
