import { Icon } from '@components/Icon';
import { firstLetterUppercase } from '@utils/stringFormat';
import React from 'react';
import { useTheme } from 'styled-components/native';

import {
  StyledContainerInfo,
  StyledDescription,
  StyledSubtitle,
  StyledTitle,
  StyledWrapper,
} from './styles';

interface CardHorizontalProps {
  title: string;
  type?: 'outlined' | 'bottomLine' | 'none';
  description?: string;
  subtitle?: string;
  icon?: { name: string; color?: string; size?: number };
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  onPress?: () => void;
}

export const Card: React.FC<CardHorizontalProps> = ({
  title,
  type = 'outlined',
  subtitle,
  icon,
  description,
  onPress,
  ...rest
}) => {
  const { colors, fonts } = useTheme();

  return (
    <StyledWrapper type={type} disabled={!onPress} onPress={onPress} {...rest}>
      <StyledContainerInfo>
        <StyledTitle>{firstLetterUppercase(title)}</StyledTitle>
        {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
      </StyledContainerInfo>

      {description && !icon && (
        <StyledDescription>{description}</StyledDescription>
      )}

      {icon && (
        <Icon
          name={icon.name}
          color={icon.color || colors.gray.white}
          size={icon.size || fonts.size.s2}
        />
      )}
    </StyledWrapper>
  );
};
