import styled from 'styled-components/native';

export const StyledContainerSync = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary[500]};
`;

export const StyledLoading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.white,
  size: 'large',
}))``;

export const StyledLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.effects.spacing.sm}px;
`;
