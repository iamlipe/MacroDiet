import React from 'react';
import { StyledDescription, StyledLineChart, StyledScroll } from './styles';

const WeightHistoricView: React.FC = () => {
  return (
    <StyledScroll>
      <StyledDescription>
        Os gráficos de peso e percentual de gordura do usuário mostram sua
        evolução ao longo do tempo, permitindo que ele acompanhe seu progresso
        em relação a metas de saúde e fitness.
      </StyledDescription>

      <StyledLineChart title="peso" data={[]} />
      <StyledLineChart title="percentual de gordura" data={[]} />
    </StyledScroll>
  );
};

export default WeightHistoricView;
