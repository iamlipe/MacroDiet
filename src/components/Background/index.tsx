import React, { ReactNode } from 'react';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

import { StyledBackground } from './styles';

interface IBackground extends SafeAreaViewProps {
  children?: ReactNode;
}

const Background = ({ children, ...rest }: IBackground) => {
  return <StyledBackground {...rest}>{children}</StyledBackground>;
};

export default Background;
