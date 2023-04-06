import React from 'react';
import { StyledProgressBar, StyledContainerProgressBar } from './styles';

interface ProgressBarProps {
  percentage: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const ProgressBar = ({ percentage, ...rest }: ProgressBarProps) => {
  return (
    <StyledContainerProgressBar {...rest}>
      <StyledProgressBar percentage={percentage <= 1 ? percentage : 1} />
    </StyledContainerProgressBar>
  );
};
