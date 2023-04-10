import styled from 'styled-components/native';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))``;

export const StyledWrapperButtonSubmit = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
