import React, { useMemo } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { StyledContainerTab, StyledTitleTab, StyledWrapper } from './styles';
import Icon from '@components/Icon';

const BottomTab = ({ state, insets, navigation }: BottomTabBarProps) => {
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
              color={colors.white}
              size={fonts.size.s1}
            />
          )}

          <StyledTitleTab>{routeName[route.name]}</StyledTitleTab>
        </StyledContainerTab>
      ))}
    </StyledWrapper>
  );
};

export default BottomTab;
