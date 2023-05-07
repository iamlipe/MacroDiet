import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import {
  LoggedStackParamsList,
  NavPropsLogged,
} from '@/core/presentation/routes/logged';

interface MenuOptionProps {
  key: string;
  iconName: string;
  name: string;
  navigateTo: keyof LoggedStackParamsList;
  params?: any;
  show: boolean;
  description?: string;
}

export const useMenu = () => {
  const { user } = useUserStore();
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();

  const menuOptions: Array<MenuOptionProps> = useMemo(
    () => [
      {
        key: '2',
        name: 'Objetivo',
        iconName: 'target',
        navigateTo: 'Goal',
        show: true,
        description: 'Configure e acompanhe seus objetivos de treino.',
      },
      {
        key: '3',
        name: 'Favoritos',
        iconName: 'heart',
        navigateTo: 'Favorites',
        show: true,
        description: 'Acesse sua lista de exercícios favoritos.',
      },
      {
        key: '4',
        name: 'Rotina',
        iconName: 'calendar',
        navigateTo: 'Routine',
        show: true,
        description: 'Veja e gerencie sua rotina de treino.',
      },
      {
        key: '5',
        name: 'Histórico',
        iconName: 'chart',
        navigateTo: 'HistoricStack',
        show: true,
        description: 'Acompanhe seu histórico de treino.',
      },
      {
        key: '6',
        name: 'Configurações',
        iconName: 'setting',
        navigateTo: 'Settings',
        show: true,
        description: 'Ajuste suas configurações de usuário.',
      },
      {
        key: '7',
        name: 'Ajuda',
        iconName: 'circle-help',
        navigateTo: 'Help',
        show: true,
        description: 'Obtenha ajuda e suporte.',
      },
    ],
    [],
  );

  const settingOptions: Array<MenuOptionProps> = useMemo(
    () => [
      {
        key: '11',
        name: 'Meus dados',
        iconName: 'user',
        navigateTo: 'UserInfo',
        show: true,
      },
      {
        key: '12',
        name: 'Notifications',
        iconName: 'star',
        navigateTo: 'Notifications',
        show: true,
      },
      {
        key: '13',
        name: 'Trocar de senha',
        iconName: 'circle-help',
        navigateTo: 'ChangePassword',
        show: user?.typeAccount === 'email',
      },
    ],
    [user?.typeAccount],
  );
  const handlePressMenuOption = (value: MenuOptionProps) => {
    const { navigateTo, params } = value;
    navigateLogged(navigateTo, params);
  };

  return { menuOptions, settingOptions, handlePressMenuOption };
};
