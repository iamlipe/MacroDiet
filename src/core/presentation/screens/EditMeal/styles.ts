import styled from 'styled-components/native';
import { EdgeInsets } from 'react-native-safe-area-context';
import Input from '@/core/presentation/shared/Input';
import Card from '@/core/presentation/shared/Card';
import Link from '@/core/presentation/shared/Link';
import Button from '@/core/presentation/shared/Button';

interface IStyledScroll {
  insets: EdgeInsets;
}

interface IStyledWrapperButtonSubmit {
  insets: EdgeInsets;
}

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))<IStyledScroll>`
  margin-bottom: ${({ insets }) => insets.bottom + 174}px;
`;

export const StyledWrapperButtonSubmit = styled.View<IStyledWrapperButtonSubmit>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ insets }) => insets.bottom + 174}px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
  padding: ${({ insets, theme }) =>
    `0 ${theme.effects.spacing.md}px ${insets.bottom}px`};
`;

export const StyledInput = styled(Input).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 1,
    marginBottom: theme.effects.spacing.md,
  },
}))``;

export const StyledForm = styled.View`
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledCardFood = styled(Card)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledTitleSection = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledContainerFoods = styled.View`
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledLinkBottomSheet = styled(Link)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
  margin-right: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledButtonExcludeMeal = styled(Button)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledContainerModalButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const StyledDescriptionModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledLinkModal = styled(Link)`
  margin-right: ${({ theme }) => theme.effects.spacing.sm}px;
`;
