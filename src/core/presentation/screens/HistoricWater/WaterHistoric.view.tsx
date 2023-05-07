import React from 'react';
import { StyledBarChart, StyledDescription, StyledScroll } from './styles';

const WaterHistoricView: React.FC = () => {
  return (
    <StyledScroll>
      <StyledDescription>
        O gráfico mostra a quantidade de água ingerida em cada dia da semana e
        destaca quando a meta diária foi alcançada.
      </StyledDescription>

      <StyledBarChart title="Water" data={[]} goal={2000} />
    </StyledScroll>
  );
};

export default WaterHistoricView;
