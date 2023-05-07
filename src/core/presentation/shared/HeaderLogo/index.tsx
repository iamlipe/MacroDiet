import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledContainerHeader } from './styles';
import { useTheme } from 'styled-components/native';
import Icon from '@/core/presentation/shared/Icon';

const HeaderLogo: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <StyledContainerHeader insets={insets}>
      <Icon name="logo" size={44} color={colors.primary[500]} />
    </StyledContainerHeader>
  );
};

export default HeaderLogo;
