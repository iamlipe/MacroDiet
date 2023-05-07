import styled from 'styled-components/native';

interface StyledContainerProps {
  width: number;
}

interface StyledContainerGridProps {
  width: number;
}

interface StyledLabelProps {
  bottom: number;
  left: number;
}

interface StyledContainerEmptyChartProps {
  width: number;
}

export const StyledContainer = styled.View<StyledContainerProps>`
  width: ${({ width }) => width - 64 - 16}px;
  align-self: center;
  height: 240px;
  flex-direction: row;
  justify-content: space-around;
  border-width: 0.6px;
  border-left-color: #ccc;
  border-bottom-color: #ccc;
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledLabelChartBar = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 12px;
  text-align: center;
  margin-bottom: -24px;
  margin-left: -16px;
`;

export const StyledContainerGrid = styled.View<StyledContainerGridProps>`
  width: ${({ width }) => width - 64 - 32}px;
  height: 240px;
  position: absolute;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  margin-left: 16px;
`;

export const StyledLabelOrigin = styled.Text<StyledLabelProps>`
  position: absolute;
  color: gray;
  bottom: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
  font-size: 11px;
  text-align: center;
`;

export const StyledLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledContainerEmptyChart = styled.View<StyledContainerEmptyChartProps>`
  width: ${({ width }) => width - 64 - 16}px;
  align-self: center;
  height: 240px;
  align-items: center;
  justify-content: center;
  padding: 16px 16px 0;
  border-width: 0.6px;
  border-left-color: ${({ theme }) => theme.colors.gray[200]};
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledLabelEmptyChart = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.gray[400]};
`;
