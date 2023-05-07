import styled from 'styled-components/native';
import Accordion from '@/core/presentation/shared/Accordion';
import Divider from '@/core/presentation/shared/Divider';
import Link from '@/core/presentation/shared/Link';
import Button from '../../shared/Button';

interface IStyledAccordion {
  lastChild: boolean;
}

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: theme.effects.spacing.vl,
    paddingHorizontal: theme.effects.spacing.md,
  },
}))``;

export const StyledWrapperMonitoring = styled.View`
  min-height: 220px;
  padding: ${({ theme }) => theme.effects.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledContainerHeaderMonitoring = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const StyledLabelInfoMonitoring = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const StyledDividerMonitoring = styled(Divider)`
  margin: ${({ theme }) => theme.effects.spacing.lg}px 0;
`;

export const StyledLabelGoalKcal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.white};
  text-align: right;
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledLabelRemainKcal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledTitleSection = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.effects.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledAccordion = styled(Accordion)<IStyledAccordion>`
  margin-bottom: ${({ theme, lastChild }) =>
    lastChild ? theme.effects.spacing.hg : theme.effects.spacing.lg}px;
`;

export const StyledFooterContentAccordion = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const StyledLinkAddFodd = styled(Link)`
  margin-right: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledWrapperButtonAddMeal = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const StyledContainerEmptyMealDayList = styled.View`
  flex: 1;
  min-height: 80px;
`;

export const StyledTextEmptyMealDayList = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledContainerBannerAD = styled.View`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledContainerDrinkWater = styled.View`
  padding: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledHeaderDrinkWater = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.effects.spacing.vs}px;
`;

export const StyledTitleDrinkWater = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledLabelGoalDrinkWater = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.white};
  text-align: right;
  margin-bottom: ${({ theme }) => theme.effects.spacing.vs}px;
`;

export const StyledBodyModalUpdateWeight = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledButtonCancelModalUpdateWeight = styled(Button)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledLinkAddWater = styled(Link)`
  margin-top: ${({ theme }) => theme.effects.spacing.vs}px;
`;
