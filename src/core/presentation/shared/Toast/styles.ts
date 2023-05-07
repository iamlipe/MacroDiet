import styled, { css } from 'styled-components/native';

interface IStyledContainerToast {
  type: 'success' | 'error' | 'info' | 'warning';
  width: number;
  bottom: number;
}

const typeToast = {
  success: css`
    border-left-color: ${({ theme }) => theme.colors.status.success};
  `,
  error: css`
    border-left-color: ${({ theme }) => theme.colors.status.error};
  `,
  info: css`
    border-left-color: ${({ theme }) => theme.colors.status.info};
  `,
  warning: css`
    border-left-color: ${({ theme }) => theme.colors.status.warning};
  `,
};

export const StyledContainerToast = styled.View<IStyledContainerToast>`
  position: absolute;
  bottom: ${({ bottom, theme }) => bottom + theme.effects.spacing.md}px;
  width: ${({ width, theme }) => width - theme.effects.spacing.vl}px;
  flex: 1;
  flex-direction: row;
  align-self: center;
  background-color: #010101;
  border-left-width: ${({ theme }) => theme.effects.border.width.tl}px;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
  ${({ type }) => typeToast[type]}
`;

export const StyledContainerInfo = styled.View`
  flex: 1;
  margin: 0 ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.nn}px;
`;

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const StyledWrapperIcon = styled.View`
  justify-content: center;
`;
