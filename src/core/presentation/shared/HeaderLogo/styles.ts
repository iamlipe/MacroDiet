import { EdgeInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

interface IStyledContainerHeader {
  insets: EdgeInsets;
}

export const StyledContainerHeader = styled.View<IStyledContainerHeader>`
  height: ${({ insets }) => insets.top + 80}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: ${({ theme, insets }) =>
    `${theme.effects.spacing.lg + insets.top}px ${theme.effects.spacing.md}px ${
      theme.effects.spacing.lg
    }px`};
`;
