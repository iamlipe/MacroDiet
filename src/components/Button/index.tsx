import { Icon } from '@components/Icon';
import { firstLetterUppercase } from '@utils/stringFormat';
import React from 'react';
import { useTheme } from 'styled-components/native';

import {
  StyledContainerIcon,
  StyledTitle,
  StyledWrapperButton,
  StyledWrapperLink,
} from './styles';

interface ButtonProps {
  title: string;
  type?: 'contained' | 'outlined' | 'link';
  icon?: { name: string; size?: number; position?: 'left' | 'right' };
  linkPosition?: 'flex-start' | 'center' | 'flex-end';
  disabled?: boolean;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = 'contained',
  icon,
  linkPosition = 'flex-start',
  disabled = false,
  onPress,
  ...rest
}) => {
  const { colors, fonts } = useTheme();

  if (type === 'link') {
    return (
      <StyledWrapperLink
        linkPosition={linkPosition}
        disabled={disabled}
        onPress={onPress}
        {...rest}>
        <StyledTitle link>{title}</StyledTitle>
      </StyledWrapperLink>
    );
  }

  return (
    <StyledWrapperButton
      type={disabled ? 'disabled' : type}
      layout={icon?.position === 'left' ? 'iconLeft' : 'iconRight'}
      disabled={disabled}
      onPress={onPress}
      {...rest}>
      <StyledTitle>{firstLetterUppercase(title)}</StyledTitle>

      {icon && (
        <StyledContainerIcon iconLeft={icon.position === 'left'}>
          <Icon
            name={icon.name}
            color={colors.gray.white}
            size={icon.size || fonts.size.s2}
          />
        </StyledContainerIcon>
      )}
    </StyledWrapperButton>
  );
};
