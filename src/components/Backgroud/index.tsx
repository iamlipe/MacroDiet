import React, { ReactNode } from 'react';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

import { StyledBackground } from './styles';

interface BackgroundProps extends SafeAreaViewProps {
  children?: ReactNode;
}

export const Background = ({ children, ...rest }: BackgroundProps) => {
  return <StyledBackground {...rest}>{children}</StyledBackground>;
};
