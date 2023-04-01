import { Label } from '@components/Label';
import React from 'react';
import { useTheme } from 'styled-components/native';

import { StyledWrapper, StyledLoading } from './styles';

export const Loading = () => {
  const { effects, fonts } = useTheme();

  return (
    <StyledWrapper>
      <StyledLoading />
      <Label
        fontFamily={fonts.family.medium}
        fontSize={fonts.size.s2}
        marginTop={effects.spacing.md}>
        Carregando...
      </Label>
    </StyledWrapper>
  );
};
