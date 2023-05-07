import styled from 'styled-components/native';
import Select from '@/core/presentation/shared/Select';
import Input from '@/core/presentation/shared/Input';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))``;

export const StyledFormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledInput = styled(Input).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 1,
    marginRight: theme.effects.spacing.vs,
  },
  inputStyle: {
    textAlign: 'center',
  },
}))``;

export const StyledSelect = styled(Select).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 2,
    marginLeft: theme.effects.spacing.vs,
  },
  inputStyle: {
    textAlign: 'center',
  },
}))``;

export const StyledWrapperButtonSubmit = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const StyledLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;
