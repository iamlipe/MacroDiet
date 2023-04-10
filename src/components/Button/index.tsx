import React from 'react';
import { firstLetterUppercase } from '@utils/stringFormat';
import { useTheme } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import Icon from '@components/Icon';
import {
  StyledContainerIcon,
  StyledTitle,
  StyledWrapperButton,
} from './styles';

interface IButton extends TouchableOpacityProps {
  title: string;
  type?: 'contained' | 'outlined';
  icon?: { name: string; size?: number; position?: 'left' | 'right' };
  onPress: () => void;
}

const Button: React.FC<IButton> = ({
  title,
  type = 'contained',
  icon,
  onPress,
  disabled,
  ...rest
}) => {
  const { colors, fonts } = useTheme();

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
            color={colors.white}
            size={icon.size || fonts.size.s2}
          />
        </StyledContainerIcon>
      )}
    </StyledWrapperButton>
  );
};

export default Button;
