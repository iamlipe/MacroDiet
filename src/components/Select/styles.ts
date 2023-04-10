import styled from 'styled-components/native';

interface IStyledLabelCardSelect {
  isPair: boolean;
}

export const StyledContainer = styled.TouchableOpacity`
  border-color: ${({ theme }) => theme.colors.white};
  border-width: ${({ theme }) => theme.effects.border.width.df}px;
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledSelected = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  line-height: 22px;
  height: 22px;
`;

export const StyledContentBottomSheet = styled.View`
  padding: ${({ theme }) => `0 ${theme.effects.spacing.md}px`};
`;

export const StyledError = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-top: ${({ theme }) => theme.effects.spacing.vs}px;
`;

export const StyledWrapperCardSelect = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.effects.spacing.sm}px 0;
`;

export const StyledLabelCardSelect = styled.Text<IStyledLabelCardSelect>`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme, isPair }) =>
    isPair ? theme.colors.gray[200] : theme.colors.white};
`;
