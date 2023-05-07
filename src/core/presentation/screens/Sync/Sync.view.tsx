import React from 'react';
import { StyledContainerSync, StyledLabel, StyledLoading } from './styles';

const SyncView: React.FC = () => {
  return (
    <StyledContainerSync>
      <StyledLoading />
      <StyledLabel>Carregando...</StyledLabel>
    </StyledContainerSync>
  );
};

export default SyncView;
