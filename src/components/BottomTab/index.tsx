import { Icon } from '@components/Icon';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import { useTheme } from 'styled-components/native';

import { StyledContainerTab, StyledTitleTab, StyledWrapper } from './styles';

export const BottomTab = ({ state, insets, navigation }: BottomTabBarProps) => {
  const { colors, fonts } = useTheme();

  const routeName: Record<string, string> = useMemo(() => {
    return {
      DietStack: 'Dieta',
      ProfileStack: 'Perfil',
    };
  }, []);

  const iconName: Record<string, string> = useMemo(() => {
    return {
      DietStack: 'cutlery',
      ProfileStack: 'user',
    };
  }, []);

  return (
    <StyledWrapper insets={insets}>
      {state.routes.map(route => (
        <StyledContainerTab
          key={route.key}
          insets={insets}
          onPress={() => navigation.navigate(route.name)}>
          {state.history[state.history.length - 1].key === route.key && (
            <Icon
              name={iconName[route.name]}
              color={colors.gray.white}
              size={fonts.size.s1}
            />
          )}

          <StyledTitleTab>{routeName[route.name]}</StyledTitleTab>
        </StyledContainerTab>
      ))}
    </StyledWrapper>
  );
};
