import styled, { css } from 'styled-components/native';

interface IStyledWrapper {
  type: 'outlined' | 'bottomLine' | 'none';
}

const typeCard = {
  outlined: css`
    border-width: ${({ theme }) => theme.effects.border.width.df}px;
    border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
    padding: ${({ theme }) => theme.effects.spacing.md}px;
  `,

  bottomLine: css`
    border-bottom-width: ${({ theme }) => theme.effects.border.width.df}px;
    padding: ${({ theme }) => theme.effects.spacing.md}px;
  `,

  none: css`
    padding: ${({ theme }) => theme.effects.spacing.md}px 0;
  `,
};

export const StyledWrapper = styled.TouchableOpacity<IStyledWrapper>`
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.background.dark};
  ${({ type }) => typeCard[type]}
`;

export const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  line-height: 24px;
`;

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  text-align: right;
`;

export const StyledSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
`;

export const StyledContainerInfo = styled.View`
  flex: 1;
`;
