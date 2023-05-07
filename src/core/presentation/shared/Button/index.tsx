import React from 'react';
import { useTheme } from 'styled-components/native';
import { firstLetterUppercase } from '@/utils/helpers/help';
import { TouchableOpacityProps } from 'react-native';
import Icon from '@/core/presentation/shared/Icon';
import {
  StyledContainerIcon,
  StyledTitle,
  StyledWrapperButton,
  StyledContainerLabel,
  StyledLoading,
} from './styles';

interface IButton extends TouchableOpacityProps {
  title: string;
  type?: 'contained' | 'outlined';
  iconComponent?: () => JSX.Element;
  icon?: { name: string; size?: number; position?: 'left' | 'right' };
  onPress: () => void;
  loading?: boolean;
}

const Button: React.FC<IButton> = ({
  title,
  type = 'contained',
  icon,
  iconComponent,
  onPress,
  disabled,
  loading = false,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <StyledWrapperButton
      type={disabled ? 'disabled' : type}
      layout={
        icon?.position === 'left' || iconComponent ? 'iconLeft' : 'iconRight'
      }
      disabled={disabled || loading}
      onPress={onPress}
      {...rest}>
      <StyledContainerLabel>
        {loading && <StyledLoading color={colors.white} size="small" />}
        <StyledTitle>{firstLetterUppercase(title)}</StyledTitle>
      </StyledContainerLabel>

      {iconComponent && (
        <StyledContainerIcon iconLeft={true}>
          {iconComponent()}
        </StyledContainerIcon>
      )}

      {icon && !loading && (
        <StyledContainerIcon iconLeft={icon.position === 'left'}>
          <Icon name={icon.name} color={colors.white} size={24} />
        </StyledContainerIcon>
      )}
    </StyledWrapperButton>
  );
};

export default Button;
