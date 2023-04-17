import React from 'react';
import { useTheme } from 'styled-components/native';
import { TouchableOpacityProps, View } from 'react-native';
import Icon from '@core/presentation/shared/Icon';
import {
  StyledContainerInfo,
  StyledDescription,
  StyledSubtitle,
  StyledTitle,
  StyledWrapper,
  StyledIconLeft,
} from './styles';
import { firstLetterUppercase } from '@utils/helpers/help';

interface ICard extends TouchableOpacityProps {
  title: string;
  type?: 'outlined' | 'bottomLine' | 'none';
  description?: string;
  subtitle?: string;
  iconLeft?: { name: string; color?: string; size?: number };
  icon?: { name: string; color?: string; size?: number };
  onPress?: () => void;
}

const Card: React.FC<ICard> = ({
  title,
  type = 'outlined',
  subtitle,
  icon,
  iconLeft,
  description,
  onPress,
  ...rest
}) => {
  const { colors, fonts, effects } = useTheme();

  return (
    <StyledWrapper type={type} disabled={!onPress} onPress={onPress} {...rest}>
      <StyledContainerInfo>
        {iconLeft && (
          <StyledIconLeft
            name={iconLeft.name}
            color={iconLeft.color || colors.primary[200]}
            size={iconLeft.size || fonts.size.tl}
            style={{ marginRight: effects.spacing.md }}
          />
        )}
        <View>
          <StyledTitle>{firstLetterUppercase(title)}</StyledTitle>
          {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
        </View>
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
