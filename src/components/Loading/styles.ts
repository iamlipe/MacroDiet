import styled from 'styled-components/native';

export const StyledWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledLoading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.gray.white,
  size: 'large',
}))``;
