import styled from 'styled-components/native';

interface BaseButtonProps {
  show: boolean;
}

export const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: ${({ theme }) =>
    `${theme.effects.spacing.lg}px ${theme.effects.spacing.md}px`};
`;

export const Title = styled.Text`
  flex: 1;
  height: 28px;
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.tl}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  text-align: center;
`;

export const BaseButton = styled.TouchableOpacity<BaseButtonProps>`
  height: 28px;
  width: 28px;
  align-items: center;
  justify-content: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;
