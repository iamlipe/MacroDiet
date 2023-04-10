import { useMemo } from 'react';
import { LoggedStackParamsList } from '@routes/logged';

interface IMenuOption {
  key: string;
  iconName: string;
  name: string;
  navigateTo: keyof LoggedStackParamsList;
}

const useMenu = () => {
  const menuOptions: Array<IMenuOption> = useMemo(
    () => [
      {
        key: '1',
        name: 'Meus dados',
        iconName: 'user',
        navigateTo: 'Info',
      },
      { key: '2', name: 'Objetivo', iconName: 'target', navigateTo: 'Goal' },
      {
        key: '3',
        name: 'Favoritos',
        iconName: 'heart',
        navigateTo: 'Favorites',
      },
      {
        key: '4',
        name: 'Rotina',
        iconName: 'calendar',
        navigateTo: 'Routine',
      },
      {
        key: '5',
        name: 'Histórico',
        iconName: 'activity',
        navigateTo: 'History',
      },
      {
        key: '6',
        name: 'Configurações',
        iconName: 'settings',
        navigateTo: 'Settings',
      },
      { key: '7', name: 'Ajuda', iconName: 'circle-help', navigateTo: 'Help' },
    ],
    [],
  );

  const handlePressMenuOption = () => {};

  return { menuOptions, handlePressMenuOption };
};

export default useMenu;
