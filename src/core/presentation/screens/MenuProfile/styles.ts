import styled from 'styled-components/native';
import Card from '@/core/presentation/shared/Card';

interface IStyledCircle {
  isDiscoloring: boolean;
}

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))``;

export const StyledCardOption = styled(Card)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledContainerDietUp = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) =>
    `${theme.effects.spacing.lg}px ${theme.effects.spacing.md}px`};
  margin-bottom: ${({ theme }) => theme.effects.spacing.vl}px;
`;

export const StyledContainerOverviewDietUp = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: ${({ theme }) => theme.effects.spacing.vl}px;
`;

export const StyledCircle = styled.View<IStyledCircle>`
  height: 24px;
  width: 24px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.effects.border.radius.circular}px;
  background-color: ${({ theme }) => theme.colors.primary[200]};
  opacity: ${({ isDiscoloring }) => (isDiscoloring ? 0.4 : 1)};
`;

export const StyledLabelExplainDietUp = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.gray[200]};
  text-align: center;
`;

export const StyledDayWeek = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledContainerMenuOptions = styled.View`
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledContainerBannerAD = styled.View`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;
