import React, { ReactNode } from 'react';
import { ScrollViewProps } from 'react-native';

import { StyledScroll } from './styles';

interface ScrollProps extends ScrollViewProps {
  paddingVertical?: number;
  paddingHorizontal?: number;
  children?: ReactNode;
}

export const Scroll = ({ children, ...rest }: ScrollProps) => {
  return <StyledScroll {...rest}>{children}</StyledScroll>;
};
