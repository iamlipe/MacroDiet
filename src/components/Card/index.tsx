import React from 'react';
import { firstLetterUppercase } from '@utils/stringFormat';
import { useTheme } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import Icon from '@components/Icon';
import {
  StyledContainerInfo,
  StyledDescription,
  StyledSubtitle,
  StyledTitle,
  StyledWrapper,
} from './styles';

interface ICard extends TouchableOpacityProps {
  title: string;
  type?: 'outlined' | 'bottomLine' | 'none';
  description?: string;
  subtitle?: string;
  icon?: { name: string; color?: string; size?: number };
  onPress?: () => void;
}

const Card: React.FC<ICard> = ({
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
          color={icon.color || colors.white}
          size={icon.size || fonts.size.s2}
        />
      )}
    </StyledWrapper>
  );
};

export default Card;
