import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface IStyledTitle {
  selected: boolean;
}

export const StyledContainerDatePicker = styled.TouchableOpacity`
  min-height: 56px;
  border-color: ${({ theme }) => theme.colors.white};
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

export const StyledTitle = styled.Text<IStyledTitle>`
  flex: 1;
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

export const StyledDatePicker = styled(DateTimePicker).attrs(({ theme }) => ({
  display: 'spinner',
  textColor: theme.fonts.color.primary,
}))`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

export const StyledContentBottomSheet = styled.View`
  padding: ${({ theme }) => `0 ${theme.effects.spacing.md}px`};
`;
