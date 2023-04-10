import { EdgeInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

interface IStyledRoundedButton {
  insets: EdgeInsets;
}

export const StyledRoundedButton = styled.TouchableOpacity<IStyledRoundedButton>`
  height: 72px;
  width: 72px;
  position: absolute;
  bottom: ${({ theme, insets }) => insets.bottom + theme.effects.spacing.hg}px;
  right: ${({ theme }) => theme.effects.spacing.lg}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.effects.border.radius.circular}px;
  background-color: ${({ theme }) => theme.colors.primary[600]};
`;
