import styled from 'styled-components/native';
import Link from '@/core/presentation/shared/Link';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))``;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledTimeWrapper = styled.View`
  flex-direction: column;
`;

export const StyledTimeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledTitleText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.gray[200]};
`;

export const StyledRightWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledDaysText = styled(StyledTitleText)`
  margin-right: ${({ theme }) => theme.effects.spacing.vs}px;
`;

export const StyledWrapperButtonSubmit = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const StyledLinkBottomSheet = styled(Link)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledContainerMealTimes = styled.View`
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledContainerModalButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const StyledDescriptionModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledLinkModal = styled(Link)`
  margin-right: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledContainerWarningModal = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f6eebe;
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
  padding: ${({ theme }) =>
    `${theme.effects.spacing.vs}px ${theme.effects.spacing.sm}px`};
`;

export const StyledWarningTextModal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${props => props.theme.colors.status.warning};
  margin-left: ${({ theme }) => theme.effects.spacing.vs}px;
`;
