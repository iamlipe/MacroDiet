import styled from 'styled-components/native';
import { Card, Icon } from '@components/index';

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
  min-height: 280px;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.effects.spacing.vl}px;
`;

export const StyledLogo = styled(Icon)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
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

export const StyledContainerScore = styled.View`
  position: absolute;
  top: 4;
  left: 0;
  height: 80;
  width: 80;
  align-items: center;
  justify-content: center;
`;

export const StyledScore = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.lt}px;
  color: ${({ theme }) => theme.colors.primary[100]};
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

export const StyledVersion = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.gray[200]};
  text-align: center;
  margin-top: ${({ theme }) => 2 * theme.effects.spacing.hg}px;
`;
