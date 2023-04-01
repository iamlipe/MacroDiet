import styled from 'styled-components/native';

interface StyledScrollProps {
  paddingVertical?: number;
  paddingHorizontal?: number;
}

export const StyledScroll = styled.ScrollView.attrs<StyledScrollProps>(
  ({ theme, paddingHorizontal, paddingVertical }) => ({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      flexGrow: 1,
      paddingVertical: paddingVertical || theme.effects.spacing.vl,
      paddingHorizontal: paddingHorizontal || theme.effects.spacing.md,
    },
  }),
)``;
