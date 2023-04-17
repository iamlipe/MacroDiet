import styled from 'styled-components/native';
import { EdgeInsets } from 'react-native-safe-area-context';

interface IStyledWrapperProps {
  insets: EdgeInsets;
}

interface IStyledContainerTabProps {
  insets: EdgeInsets;
}

export const StyledWrapper = styled.View<IStyledWrapperProps>`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ insets, theme }) =>
    `${theme.effects.spacing.nn}px ${theme.effects.spacing.nn}px ${
      theme.effects.spacing.nn + insets.bottom
    }px`};
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

export const StyledContainerTab = styled.TouchableOpacity<IStyledContainerTabProps>`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledTitleTab = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-top: ${({ theme }) => theme.effects.spacing.sm}px;
`;
