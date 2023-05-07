import styled from 'styled-components/native';

interface StyledContainerChartProps {
  width: number;
}

interface StyledTextContainerProps {
  width: number;
}

interface StyledChartBarProps {
  height: number;
  isGoal: boolean;
}

interface StyledLabelProps {
  bottom: number;
  left: number;
}

interface StyledDashedLineProps {
  bottom: number;
  height: number;
}

interface StyledContainerGridProps {
  width: number;
}

interface StyledContainerEmptyChartProps {
  width: number;
}

export const StyledContainerChart = styled.View<StyledContainerChartProps>`
  width: ${({ width }) => width - 64 - 16}px;
  align-self: center;
  height: 240px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  padding: 16px 16px 0;
  border-width: 0.6px;
  border-left-color: ${({ theme }) => theme.colors.gray[200]};
  border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
`;

export const StyledTextContainer = styled.View<StyledTextContainerProps>`
  width: ${({ width }) => width - 64 - 16}px;
  height: 240px;
  align-self: center;
  position: absolute;
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
`;

export const StyledChartBar = styled.View<StyledChartBarProps>`
  height: ${({ height }) => `${height}%`};
  width: 16px;
  background-color: ${({ theme, isGoal }) =>
    isGoal ? theme.colors.primary[500] : theme.colors.primary[300]};
`;

export const StyledLabelOrigin = styled.Text<StyledLabelProps>`
  position: absolute;
  color: gray;
  bottom: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
  font-size: 11px;
  text-align: center;
`;

export const StyledLabelGoal = styled(StyledLabelOrigin)`
  bottom: ${({ bottom }) => `${bottom}%`};
`;

export const StyledDashedLine = styled.View<StyledDashedLineProps>`
  position: absolute;
  bottom: ${({ bottom }) => `${bottom}%`};
  left: 16px;
  align-self: center;
  width: 100%;
  height: ${({ height }) => `${height}%`};
  border-width: 1px;
  border-bottom-width: 1px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.primary[200]};
`;

export const StyledLabelChartBar = styled.Text`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 11px;
  text-align: center;
  margin-bottom: -40px;
`;

export const StyledContainerGrid = styled.View<StyledContainerGridProps>`
  width: ${({ width }) => width - 64 - 16}px;
  height: 240px;
  align-self: center;
  position: absolute;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  padding: 16px;
`;

export const StyledLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
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
