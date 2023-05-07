import styled from 'styled-components/native';

interface IStyledContainerOption {
  selected: boolean;
  lastChild: boolean;
}

interface IStyledTitle {
  selected: boolean;
}

interface IStyledDescription {
  selected: boolean;
}

export const StyledContainerOption = styled.TouchableOpacity<IStyledContainerOption>`
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary[200] : theme.colors.white};
  border-width: ${({ theme }) => theme.effects.border.width.df}px;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
  margin-bottom: ${({ theme, lastChild }) =>
    !lastChild ? theme.effects.spacing.md : 0}px;
`;

export const StyledTitle = styled.Text<IStyledTitle>`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.primary[200] : theme.fonts.color.primary};
  line-height: 24px;
`;

export const StyledLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledError = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-top: ${({ theme }) => theme.effects.spacing.vs}px;
`;

export const StyledDescription = styled.Text<IStyledDescription>`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.primary[200] : theme.colors.gray[400]};
  margin-top: ${({ theme }) => theme.effects.spacing.vs}px;
`;
