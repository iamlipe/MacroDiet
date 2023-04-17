import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from '@core/presentation/shared/Icon';
import {
  StyledContainerIcon,
  StyledTitle,
  StyledContainerLink,
} from './styles';

interface ILink extends TouchableOpacityProps {
  title: string;
  size?: number;
  position?: 'flex-start' | 'center' | 'flex-end';
  onPress: () => void;
  icon?: { name: string; size?: number; position?: 'left' | 'right' };
}

const Link: React.FC<ILink> = ({
  title,
  position = 'flex-start',
  size,
  onPress,
  icon,
  ...rest
}) => {
  const { colors, fonts } = useTheme();

  return (
    <StyledContainerLink
      position={position}
      iconLeft={icon?.position === 'left'}
      onPress={onPress}
      {...rest}>
      <StyledTitle size={size}>{title}</StyledTitle>

      {icon && (
        <StyledContainerIcon iconLeft={icon.position === 'left'}>
          <Icon
            name={icon.name}
            color={colors.white}
            size={icon.size || fonts.size.s2}
          />
        </StyledContainerIcon>
      )}
    </StyledContainerLink>
  );
};

export default Link;
