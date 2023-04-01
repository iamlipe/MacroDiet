import React, { ReactNode } from 'react';
import { TextStyle } from 'react-native';

import { StyledLabel } from './styles';

interface LabelProps extends TextStyle {
  width?: number;
  height?: number;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  children?: ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
  return <StyledLabel {...rest}>{children}</StyledLabel>;
};
