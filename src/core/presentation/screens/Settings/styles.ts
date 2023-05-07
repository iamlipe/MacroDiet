import styled from 'styled-components/native';
import Card from '@/core/presentation/shared/Card';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))``;

export const StyledCardOption = styled(Card)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;
