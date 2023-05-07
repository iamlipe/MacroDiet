import React from 'react';
import { firstLetterUppercase } from '@/utils/helpers/help';
import { useTheme } from 'styled-components/native';
import { TouchableOpacityProps, View } from 'react-native';
import Icon from '@/core/presentation/shared/Icon';
import {
  StyledContainerInfo,
  StyledDescription,
  StyledSubtitle,
  StyledTitle,
  StyledWrapper,
  StyledIconLeft,
} from './styles';

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
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <StyledContainerInfo>
          {iconLeft && (
            <StyledIconLeft
              name={iconLeft.name}
              color={iconLeft.color || colors.primary[400]}
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
      </View>

      {icon && (
        <View style={{ padding: 4, marginLeft: 40 }}>
          <Icon name={icon.name} color={icon.color || colors.white} size={24} />
        </View>
      )}
    </StyledWrapper>
  );
};

export default Card;
