import styled from 'styled-components/native';

interface DividerLineProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const DividerLine = styled.View<DividerLineProps>`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[400]};
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;
