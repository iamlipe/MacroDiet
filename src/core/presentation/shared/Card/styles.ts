import styled, { css } from 'styled-components/native';
import Icon from '@/core/presentation/shared/Icon';

interface IStyledWrapper {
  type: 'outlined' | 'bottomLine' | 'none';
}

const typeCard = {
  outlined: css`
    border-width: ${({ theme }) => theme.effects.border.width.df}px;
    padding: ${({ theme }) => theme.effects.spacing.md}px;
  `,

  bottomLine: css`
    border-bottom-width: ${({ theme }) => theme.effects.border.width.df}px;
    padding: ${({ theme }) => theme.effects.spacing.md}px;
  `,

  none: css`
    padding: ${({ theme }) => theme.effects.spacing.sm}px 0;
  `,
};

export const StyledWrapper = styled.TouchableOpacity<IStyledWrapper>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.background.dark};
  ${({ type }) => typeCard[type]}
`;

export const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
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
  margin-top: ${({ theme }) => theme.effects.spacing.nn}px;
`;

export const StyledContainerInfo = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const StyledIconLeft = styled(Icon)`
  margin-right: ${({ theme }) => theme.effects.spacing.md}px;
`;
