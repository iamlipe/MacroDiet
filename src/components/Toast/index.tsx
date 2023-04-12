import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import Icon from '@components/Icon';
import {
  StyledContainerInfo,
  StyledContainerToast,
  StyledDescription,
  StyledTitle,
} from './styles';

export interface IToast {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

const Toast: React.FC<IToast> = ({ type, message }) => {
  const { fonts, colors } = useTheme();
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  return (
    <StyledContainerToast width={width} bottom={bottom}>
      <Icon name="circle-x" size={fonts.size.tl} color={colors.status[type]} />
      <StyledContainerInfo>
        <StyledTitle>{type}</StyledTitle>
        <StyledDescription>{message}</StyledDescription>
      </StyledContainerInfo>
    </StyledContainerToast>
  );
};

export default Toast;
