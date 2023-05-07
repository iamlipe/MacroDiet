import styled from 'styled-components/native';
import Input from '@/core/presentation/shared/Input';
import Button from '@/core/presentation/shared/Button';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: theme.effects.spacing.vl,
    paddingLeft: theme.effects.spacing.md,
  },
}))``;

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.gray[200]};
  line-height: 28px;
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
  margin-right: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledInput = styled(Input).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 1,
    marginBottom: theme.effects.spacing.md,
    marginRight: theme.effects.spacing.md,
  },
}))``;

export const StyledInputTwoThirds = styled(Input).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 2,
    marginBottom: theme.effects.spacing.md,
    marginRight: theme.effects.spacing.md,
  },
}))``;

export const StyledFormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledForm = styled.View`
  flex: 1;
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledError = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
  margin-right: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledButtonSubmit = styled(Button)`
  margin-right: ${({ theme }) => theme.effects.spacing.md}px;
`;
