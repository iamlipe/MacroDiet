import styled from 'styled-components/native';

interface IStyledBaseButton {
  show: boolean;
}

export const StyledContainerHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: ${({ theme }) =>
    `${theme.effects.spacing.lg}px ${theme.effects.spacing.md}px`};
`;

export const StyledTitle = styled.Text`
  flex: 1;
  height: 28px;
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.tl}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  text-align: center;
`;

export const StyledBaseButton = styled.TouchableOpacity<IStyledBaseButton>`
  height: 28px;
  width: 28px;
  align-items: center;
  justify-content: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;
