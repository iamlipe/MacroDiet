import React from 'react';
import { StyledContainerLoading, StyledLoading, StyledLabel } from './styles';

const Loading = () => {
  return (
    <StyledContainerLoading>
      <StyledLoading />
      <StyledLabel>Carregando...</StyledLabel>
    </StyledContainerLoading>
  );
};

export default Loading;
