import React, { useMemo } from 'react';
import { StyledProgressBar, StyledContainerProgressBar } from './styles';

interface IProgressbar {
  percentage: number;
}

const ProgressBar: React.FC<IProgressbar> = ({ percentage }) => {
  const progress = useMemo(
    () => (percentage <= 1 ? percentage * 100 : 100),
    [percentage],
  );

  return (
    <StyledContainerProgressBar>
      <StyledProgressBar percentage={progress} />
    </StyledContainerProgressBar>
  );
};

export default ProgressBar;
