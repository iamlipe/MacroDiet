import React from 'react';
import { useTheme } from 'styled-components/native';
import { Icon } from '@components/Icon';
import { Label } from '@components/Label';
import { StyledWrapper } from './styles';

interface LogoProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const Logo = ({ ...rest }: LogoProps) => {
  const { colors, effects, fonts } = useTheme();

  return (
    <StyledWrapper {...rest}>
      <Icon name="logo" color={colors.primary[500]} size={24} />
      <Label
        fontSize={fonts.size.lg}
        fontFamily={fonts.family.bold}
        color={colors.primary[500]}
        marginTop={effects.spacing.nn}>
        Macros
      </Label>
    </StyledWrapper>
  );
};
