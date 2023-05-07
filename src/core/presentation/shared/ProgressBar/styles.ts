import styled from 'styled-components/native';

interface IStyledProgressBar {
  percentage: number;
}

export const StyledContainerProgressBar = styled.View`
  height: 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary[300]};
`;

export const StyledProgressBar = styled.View<IStyledProgressBar>`
  height: 12px;
  width: ${({ percentage }) => percentage}%;
  background-color: ${({ theme }) => theme.colors.primary[600]};
`;
