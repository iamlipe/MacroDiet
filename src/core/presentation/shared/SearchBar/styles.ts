import styled from 'styled-components/native';

export const StyledContainerSearchBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.white};
  border-width: ${({ theme }) => theme.effects.border.width.df}px;
  padding: ${({ theme }) =>
    `${theme.effects.spacing.lg}px ${theme.effects.spacing.md}px`};
`;

export const StyledTextInputSearchBar = styled.TextInput.attrs(({ theme }) => ({
  placeHolderTextColor: theme.fonts.color.primary,
}))`
  flex: 1;
  padding: 0;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  height: 24px;
  margin-left: ${({ theme }) => theme.effects.spacing.md}px;
`;
