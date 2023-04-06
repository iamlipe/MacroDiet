import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface StyledWrapperProps {
  flex?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

interface StyledContainer {
  name: string;
}

interface TitleProps {
  selected: boolean;
}

export const StyledWrapper = styled.View<StyledWrapperProps>`
  flex: ${({ flex }) => flex || 0};
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;

export const StyledContainer = styled.TouchableOpacity<StyledContainer>`
  min-height: 56px;
  flex: 1;
  border-color: ${({ theme }) => theme.colors.gray.white};
  border-width: ${({ theme }) => theme.effects.border.width.df}px;
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledTitle = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme, selected }) =>
    selected ? theme.fonts.color.primary : theme.fonts.color.secundary};
  line-height: 24px;
`;

export const StyledError = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-top: ${({ theme }) => theme.effects.spacing.vs}px;
`;

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

export const StyledBackdrop = styled.Pressable`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.modal};
`;

export const StyledDatePicker = styled(DateTimePicker).attrs(({ theme }) => ({
  display: 'spinner',
  textColor: theme.fonts.color.primary,
}))`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.dark};
`;
