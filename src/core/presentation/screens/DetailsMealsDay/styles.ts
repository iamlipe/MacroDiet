import styled from 'styled-components/native';
import { ProgressCircle } from 'react-native-svg-charts';
import { ReactNode } from 'react';
import { Text } from 'react-native-svg';

interface IStyledProgressCircle {
  children: ReactNode;
}

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: theme.effects.spacing.vl,
    paddingHorizontal: theme.effects.spacing.md,
  },
}))``;

export const StyledProgressCircle = styled(ProgressCircle).attrs(
  ({ theme }) => ({
    cornerRadius: 0.1,
    progressColor: theme.colors.primary[600],
    backgroundColor: theme.colors.primary[300],
    strokeWidth: 16,
  }),
)<IStyledProgressCircle>`
  height: 180px;
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledLabelConsumedKcal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledHeaderNutrionalInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledHeaderNutrionalInfoWithoutProgressBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledContainerProgressInfo = styled.View`
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledLabelNutritionalInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledLabelNutritionalInfoWithoutProgressBar = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledLabelNutrionalInfoConsumedWithoutProgressbar = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledLabelGoalKcal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledLabelRemainKcal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledLabelProgressKcal = styled(Text).attrs(({ theme }) => ({
  x: -0.5,
  y: 1.5,
  fill: theme.colors.white,
  textAnchor: 'middle',
  alignmentBaseline: 'middle',
  fontSize: theme.fonts.size.lt,
  fontFamily: theme.fonts.family.bold,
  stroke: theme.colors.white,
  opacity: '1',
  strokeWidth: 0.4,
}))``;
