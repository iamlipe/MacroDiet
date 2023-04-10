import React, { useEffect } from 'react';
import { useSync } from '@hooks/index';
import { StyledContainerSync, StyledLabel, StyledLoading } from './styles';

export const Sync = () => {
  const { sync } = useSync();

  useEffect(() => {
    sync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainerSync>
      <StyledLoading />
      <StyledLabel>Carregando...</StyledLabel>
    </StyledContainerSync>
  );
};

export default Sync;
