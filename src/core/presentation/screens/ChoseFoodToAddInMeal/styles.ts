import styled from 'styled-components/native';
import Card from '@/core/presentation/shared/Card';
import SearchBar from '@/core/presentation/shared/SearchBar';
import Accordion from '../../shared/Accordion';

export const StyledLabelEmptyListFood = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledDescriptionEmptyListFood = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.gray[200]};
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

export const StyledContainerBannerAD = styled.View`
  align-items: center;
  margin-top: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledContainerLoadingSearchFoods = styled.View`
  flex: 1;
`;

export const StyledLabelLoadingSearchFoods = styled(StyledLabelEmptyListFood)``;

export const StyledAccordion = styled(Accordion)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;
