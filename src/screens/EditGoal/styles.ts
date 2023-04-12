import styled from 'styled-components/native';
import { DatePicker, Input, Select } from '@components/index';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))``;

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.colors.gray[200]};
  line-height: 28px;
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledInput = styled(Input).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 1,
    marginBottom: theme.effects.spacing.md,
  },
}))``;

export const StyledSelect = styled(Select).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 1,
    marginBottom: theme.effects.spacing.md,
  },
}))``;

export const StyledSelectTwoThirds = styled(Select).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 2,
    marginBottom: theme.effects.spacing.md,
    marginLeft: theme.effects.spacing.md,
  },
}))``;

export const StyledDatePicker = styled(DatePicker)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledWrapperButtonSubmit = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const StyledForm = styled.View`
  flex: 1;
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledFormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledError = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;
