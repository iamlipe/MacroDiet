import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { StyledContainerHeader } from './styles';
import Icon from '@core/presentation/shared/Icon';

const HeaderLogo: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <StyledContainerHeader insets={insets}>
      <Icon name="logo" color={colors.primary[500]} size={32} />
    </StyledContainerHeader>
  );
};

export default HeaderLogo;
