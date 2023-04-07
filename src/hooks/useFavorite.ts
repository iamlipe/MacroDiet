import { useUserStore } from '@stores/user';
import { useCallback, useMemo, useState } from 'react';
import { useFoods } from './useFoods';
import { useHandleError } from './useHandleError';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const useFavorite = () => {
  const [loading, setLoading] = useState(false);
  const [favoritesFoodsList, setFavoritesFoodsList] = useState([]);
  const { handleFirestoreError } = useHandleError();
  const { user, setFavoritesFoods } = useUserStore();
  const { getFood } = useFoods();

  const updateFavoritesFoods = useCallback(
    async (foodDoc: string) => {
      try {
        setLoading(true);

        const isFavorited = user.preferences.favoritesFoods.includes(foodDoc);

        const favorites = isFavorited
          ? user.preferences.favoritesFoods.filter(food => food !== foodDoc)
          : [...user.preferences.favoritesFoods, foodDoc];

        await firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update({
            'preferences.favoritesFoods': favorites,
          });

        setFavoritesFoods(favorites);
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleFirestoreError, setFavoritesFoods, user.preferences.favoritesFoods],
  );

  const getFavoritesFoods = useMemo(() => {
    return user.preferences.favoritesFoods.map(foodDoc => getFood(foodDoc));
  }, [getFood, user.preferences.favoritesFoods]);

  return {
    favoritesFoodsList,
    getFavoritesFoods,
    setFavoritesFoodsList,
    updateFavoritesFoods,
    loading,
  };
};
