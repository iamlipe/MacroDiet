import { useMemo } from 'react';
import { LoggedStackParamsList } from '@routes/logged';

interface IMenuOption {
  key: string;
  name: string;
  navigateTo: keyof LoggedStackParamsList;
}

const useMenu = () => {
  const menuOptions: Array<IMenuOption> = useMemo(
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

export default useMenu;
