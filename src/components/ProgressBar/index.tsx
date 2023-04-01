import React from 'react';

import { StyledProgressBar, StyledWrapperProgressBar } from './styles';

export const ProgressBar = () => {
  return (
    <StyledWrapperProgressBar>
      <StyledProgressBar />
    </StyledWrapperProgressBar>
  );
};
