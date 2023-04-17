import styled from 'styled-components/native';
import Input from '@core/presentation/shared/Input';
import Select from '@core/presentation/shared/Select';

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
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
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

export const StyledError = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;
