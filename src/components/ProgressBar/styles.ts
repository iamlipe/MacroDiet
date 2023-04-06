import styled from 'styled-components/native';

interface StyledContainerProgressBarProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

interface StyledProgressBarProps {
  percentage: number;
}

export const StyledContainerProgressBar = styled.View<StyledContainerProgressBarProps>`
  height: 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary[300]};
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;

export const StyledProgressBar = styled.View<StyledProgressBarProps>`
  height: 12px;
  width: ${({ percentage }) => percentage * 100}%;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
`;
