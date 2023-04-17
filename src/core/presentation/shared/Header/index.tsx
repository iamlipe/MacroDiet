import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { StyledContainerHeader, StyledTitle, StyledBaseButton } from './styles';
import Icon from '@core/presentation/shared/Icon';

interface HeaderProps extends NativeStackHeaderProps {
  hasLogo?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  navigation,
  hasLogo = false,
  back,
  route,
}) => {
  const { colors, fonts } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <StyledContainerHeader hasLogo={hasLogo} insets={insets}>
      {back ? (
        <StyledBaseButton onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} color={colors.white} size={fonts.size.s2} />
        </StyledBaseButton>
      ) : null}

      {hasLogo ? (
        <Icon name="logo" color={colors.primary[500]} size={32} />
      ) : (
        <StyledTitle>{route.name}</StyledTitle>
      )}

      {back ? <StyledBaseButton disabled /> : null}
    </StyledContainerHeader>
  );
};

export default Header;
