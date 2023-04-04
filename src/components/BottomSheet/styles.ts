import styled from 'styled-components/native';
import { BottomSheetScrollView, BottomSheetModal } from '@gorhom/bottom-sheet';

export const StyledBottomSheet = styled(BottomSheetModal).attrs(
  ({ theme }) => ({
    handleStyle: {
      height: 40,
      backgroundColor: theme.colors.background.dark,
      justifyContent: 'center',
    },
    handleIndicatorStyle: {
      width: 40,
      backgroundColor: theme.colors.gray.white,
    },
  }),
)`
  background-color: ${({ theme }) => theme.colors.gray.black};
`;

export const StyledBottomSheetScroll = styled(BottomSheetScrollView)`
  background-color: ${({ theme }) => theme.colors.background.dark};
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
