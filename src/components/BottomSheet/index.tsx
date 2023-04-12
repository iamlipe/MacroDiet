import React, { ReactNode, forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  StyledBackdrop,
  StyledBottomSheet,
  StyledScrollViewBottomSheet,
  StyledContentViewBottomSheet,
} from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IBottomSheet {
  snapPoints: Array<string | number>;
  children: ReactNode;
  close: () => void;
  withScroll?: boolean;
}

const BottomSheet = forwardRef<BottomSheetModal, IBottomSheet>(
  ({ children, snapPoints, withScroll = false, close }, ref) => {
    const insets = useSafeAreaInsets();

    const renderBackDrop = () => {
      return <StyledBackdrop onPress={close} />;
    };

    return (
      <StyledBottomSheet
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackDrop}>
        <>
          {withScroll ? (
            <StyledScrollViewBottomSheet insets={insets}>
              {children}
            </StyledScrollViewBottomSheet>
          ) : (
            <StyledContentViewBottomSheet>
              {children}
            </StyledContentViewBottomSheet>
          )}
        </>
      </StyledBottomSheet>
    );
  },
);

export default BottomSheet;
