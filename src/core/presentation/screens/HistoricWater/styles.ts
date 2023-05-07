import styled from 'styled-components/native';
import BarChart from '../../shared/BarChart';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))``;

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.colors.gray[200]};
  line-height: 28px;
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledBarChart = styled(BarChart).attrs(({ theme }) => ({
  wrapperStyle: { marginBottom: theme.effects.spacing.lg },
}))``;
