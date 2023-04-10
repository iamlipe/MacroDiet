import styled from 'styled-components/native';
import { BottomSheetScrollView, BottomSheetModal } from '@gorhom/bottom-sheet';

export const StyledBottomSheet = styled(BottomSheetModal).attrs(
  ({ theme }) => ({
    backgroundStyle: { backgroundColor: theme.colors.background.dark },
    handleStyle: {
      height: 40,
      backgroundColor: theme.colors.background.dark,
      justifyContent: 'center',
    },
    handleIndicatorStyle: {
      width: 40,
      backgroundColor: theme.colors.white,
    },
  }),
)`
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

export const StyledScrollViewBottomSheet = styled(BottomSheetScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledContentViewBottomSheet = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledBackdrop = styled.Pressable`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.modal};
`;
