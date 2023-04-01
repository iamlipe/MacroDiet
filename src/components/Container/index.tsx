import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { StyledContainer } from './styles';

interface ContainerProps extends ViewStyle {
  children?: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return <StyledContainer style={{ ...rest }}>{children}</StyledContainer>;
};
