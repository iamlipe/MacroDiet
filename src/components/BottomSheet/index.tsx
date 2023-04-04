import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ReactNode, forwardRef } from 'react';
import {
  StyledBackdrop,
  StyledBottomSheet,
  StyledBottomSheetScroll,
} from './styles';

interface BottomSheetProps {
  snapPoints: Array<string | number>;
  children: ReactNode;
  close: () => void;
}

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ children, snapPoints, close }, ref) => {
    const renderBackDrop = () => {
      return <StyledBackdrop onPress={close} />;
    };

    return (
      <StyledBottomSheet
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackDrop}>
        <StyledBottomSheetScroll>{children}</StyledBottomSheetScroll>
      </StyledBottomSheet>
    );
  },
);
