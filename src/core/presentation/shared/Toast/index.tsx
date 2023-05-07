import React from 'react';
import { firstLetterUppercase } from '@/utils/helpers/help';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import Icon from '@/core/presentation/shared/Icon';
import {
  StyledContainerInfo,
  StyledContainerToast,
  StyledDescription,
  StyledTitle,
  StyledWrapperIcon,
} from './styles';

export interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  close?: () => void;
}

const iconToast: { [key: string]: string } = {
  success: 'circle-check',
  error: 'circle-x',
  info: 'circle-info',
  warning: 'circle-warning',
};

const Toast: React.FC<ToastProps> = ({ type, message, close }) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  return (
    <StyledContainerToast type={type} width={width} bottom={bottom}>
      <StyledWrapperIcon>
        <Icon name={iconToast[type]} size={32} color={colors.status[type]} />
      </StyledWrapperIcon>

      <StyledContainerInfo>
        <StyledTitle>{firstLetterUppercase(type)}</StyledTitle>
        <StyledDescription numberOfLines={2}>{message}</StyledDescription>
      </StyledContainerInfo>

      <TouchableOpacity onPress={close}>
        <Icon name="x" size={16} color={colors.gray[400]} />
      </TouchableOpacity>
    </StyledContainerToast>
  );
};

export default Toast;
