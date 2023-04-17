import React, { useEffect } from 'react';
import { useSync } from '@core/infrastructure/hooks/useSync';
import { StyledContainerSync, StyledLabel, StyledLoading } from './styles';

const Sync: React.FC = () => {
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
