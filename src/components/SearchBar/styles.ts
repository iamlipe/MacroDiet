import styled from 'styled-components/native';

interface ContainerProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.gray.white};
  border-width: ${({ theme }) => theme.effects.border.width.df}px;
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  padding: ${({ theme }) =>
    `${theme.effects.spacing.lg}px ${theme.effects.spacing.md}px`};
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
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
