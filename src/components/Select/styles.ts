import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

interface WrapperProps {
  name: string;
  flex?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const Wrapper = styled.View<WrapperProps>`
  flex: ${({ flex }) => flex};
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const Container = styled.TouchableOpacity`
  border-color: ${({ theme }) => theme.colors.gray.white};
  border-width: ${({ theme }) => theme.effects.border.width.df}px;
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const Selected = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  line-height: 24px;
  height: 24px;
`;

export const BottomSheet = styled(BottomSheetModal).attrs(({ theme }) => ({
  handleStyle: {
    height: 40,
    backgroundColor: theme.colors.background.dark,
    justifyContent: 'center',
  },
  handleIndicatorStyle: {
    width: 40,
    backgroundColor: theme.colors.gray.white,
  },
}))`
  background-color: ${({ theme }) => theme.colors.gray.black};
`;

export const BottomSheetScroll = styled(BottomSheetScrollView)`
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: ${({ theme }) =>
    `${theme.effects.spacing.lg}px ${theme.effects.spacing.md}px`};
`;

export const Backdrop = styled.Pressable`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.modal};
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-top: ${({ theme }) => theme.effects.spacing.vs}px;
`;
