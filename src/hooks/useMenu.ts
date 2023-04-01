import { LoggedStackParamsList } from '@routes/logged';
import { useMemo } from 'react';

interface MenuOptionsProps {
  key: string;
  name: string;
  navigateTo: keyof LoggedStackParamsList;
}

export const useMenu = () => {
  const menuOptions: MenuOptionsProps[] = useMemo(
    () => [
      { key: '1', name: 'Informações principais', navigateTo: 'Info' },
      { key: '2', name: 'Objetivo', navigateTo: 'Goal' },
      { key: '3', name: 'Favoritos', navigateTo: 'Favorites' },
      { key: '4', name: 'Notificações', navigateTo: 'Notifications' },
      { key: '5', name: 'Histórico macros', navigateTo: 'History' },
      { key: '6', name: 'Help', navigateTo: 'Help' },
    ],
    [],
  );

  return { menuOptions };
};
