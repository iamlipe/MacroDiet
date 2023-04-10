import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from '@components/Icon';
import {
  StyledContainerIcon,
  StyledTitle,
  StyledContainerLink,
} from './styles';

interface ILink extends TouchableOpacityProps {
  title: string;
  position?: 'flex-start' | 'center' | 'flex-end';
  onPress: () => void;
  icon?: { name: string; size?: number; position?: 'left' | 'right' };
}

const Link: React.FC<ILink> = ({ title, position, onPress, icon, ...rest }) => {
  const { colors, fonts } = useTheme();

  return (
    <StyledContainerLink position={position} onPress={onPress} {...rest}>
      <StyledTitle link>{title}</StyledTitle>
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
