import styled, { css } from 'styled-components/native';

interface StyledWrapperButtonProps {
  type: 'contained' | 'outlined' | 'disabled';
  layout: 'iconLeft' | 'iconRight';
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

interface StyledWrapperLinkProps {
  linkPosition: 'flex-start' | 'center' | 'flex-end';
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

interface StyledTitleProps {
  link?: boolean;
}

interface StyledContainerIconProps {
  iconLeft?: boolean;
}

const typeButton = {
  contained: css`
    background-color: ${({ theme }) => theme.colors.primary[600]};
  `,

  outlined: css`
    border-width: ${({ theme }) => theme.effects.border.width.df}px;
    border-color: ${({ theme }) => theme.colors.gray.white};
  `,

  disabled: css`
    background-color: ${({ theme }) => theme.colors.gray[200]};
  `,
};

const layoutButton = {
  iconLeft: css`
    flex-direction: row-reverse;
    justify-content: flex-end;
  `,

  iconRight: css`
    flex-direction: row;
    justify-content: space-between;
  `,
};

export const StyledWrapperButton = styled.TouchableOpacity<StyledWrapperButtonProps>`
  align-items: center;
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;

  ${({ type }) => typeButton[type]}
  ${({ layout }) => layoutButton[layout]}
`;

export const StyledWrapperLink = styled.TouchableOpacity.attrs({
  containerStyle: { alignSelf: 'baseline' },
})<StyledWrapperLinkProps>`
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
  align-self: ${({ linkPosition }) => linkPosition};
`;

export const StyledTitle = styled.Text<StyledTitleProps>`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ link, theme }) =>
    link ? theme.fonts.size.md : theme.fonts.size.s2}px;
  text-decoration: ${({ link }) => (link ? 'underline' : 'none')};
  text-decoration-color: ${({ theme }) => theme.fonts.color.secundary};
  color: ${({ theme }) => theme.fonts.color.primary};
  line-height: 24px;
`;

export const StyledContainerIcon = styled.View<StyledContainerIconProps>`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-right: ${({ iconLeft, theme }) =>
    iconLeft ? theme.effects.spacing.md : 0}px;
`;
