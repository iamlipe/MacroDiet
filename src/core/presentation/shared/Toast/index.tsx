import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  StyledContainerInfo,
  StyledContainerToast,
  StyledDescription,
  StyledTitle,
} from './styles';

export interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

const Toast: React.FC<ToastProps> = ({ type, message }) => {
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  return (
    <StyledContainerToast width={width} bottom={bottom}>
      <StyledContainerInfo>
        <StyledTitle>{type}</StyledTitle>
        <StyledDescription>{message}</StyledDescription>
      </StyledContainerInfo>
    </StyledContainerToast>
  );
};

export default Toast;
