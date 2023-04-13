import styled from 'styled-components/native';
import { Card, SearchBar } from '@components/index';

export const StyledContainerEmptyListFood = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledCircle = styled.View`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.effects.border.radius.circular}px;
  background-color: ${({ theme }) => theme.colors.primary[200]};
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledLabelEmptyListFood = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledCardFood = styled(Card)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledContent = styled.View`
  flex: 1;
  padding: ${({ theme }) =>
    `${theme.effects.spacing.vl}px ${theme.effects.spacing.md}px`};
`;

export const StyledSearchBar = styled(SearchBar).attrs(({ theme }) => ({
  wrapperStyle: {
    marginBottom: theme.effects.spacing.hg,
  },
}))``;

export const StyledTitleSection = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: ${({ theme }) => theme.effects.spacing.md}px 0;
`;
