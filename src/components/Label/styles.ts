import styled from 'styled-components/native';

interface StyledLabelProps {
  width?: number;
  height?: number;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const StyledLabel = styled.Text<StyledLabelProps>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  font-family: ${({ fontFamily, theme }) =>
    fontFamily || theme.fonts.family.regular};
  font-size: ${({ fontSize, theme }) => fontSize || theme.fonts.size.md}px;
  color: ${({ color, theme }) => color || theme.fonts.color.primary};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;
