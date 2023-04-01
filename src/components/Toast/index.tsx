import { Icon } from '@components/Icon';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

import { Container, Description, Info, Label } from './styles';

export interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export const Toast = ({ type, message }: ToastProps) => {
  const { fonts, colors } = useTheme();
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  return (
    <Container width={width} bottom={bottom}>
      <Icon name={type} size={fonts.size.tl} color={colors.status[type]} />
      <Info>
        <Label>{type}</Label>
        <Description>{message}</Description>
      </Info>
    </Container>
  );
};
