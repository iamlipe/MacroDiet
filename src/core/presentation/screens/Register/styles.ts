import styled from 'styled-components/native';
import Input from '@core/presentation/shared/Input';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: theme.effects.spacing.vl,
    paddingHorizontal: theme.effects.spacing.md,
  },
}))``;

export const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledInput = styled(Input).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 1,
    marginBottom: theme.effects.spacing.md,
  },
}))``;

export const StyledWrapperButtonSubmit = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const StyledTerms = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;
