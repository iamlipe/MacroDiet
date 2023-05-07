import styled from 'styled-components/native';
import { EdgeInsets } from 'react-native-safe-area-context';

interface IStyledContainerHeader {
  insets: EdgeInsets;
  hasLogo: boolean;
  transparent: boolean;
}

export const StyledContainerHeader = styled.View<IStyledContainerHeader>`
  height: ${({ insets }) => insets.top + 80}px;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ hasLogo }) => (hasLogo ? 'center' : 'space-between')};
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.colors.background.dark};
  padding: ${({ theme, insets }) =>
    `${theme.effects.spacing.lg + insets.top}px ${theme.effects.spacing.md}px ${
      theme.effects.spacing.lg
    }px`};
`;

export const StyledTitle = styled.Text`
  flex: 1;
  height: 28px;
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.tl}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  text-align: center;
`;

export const StyledBaseButton = styled.TouchableOpacity`
  height: 28px;
  width: 28px;
  align-items: center;
  justify-content: center;
`;
