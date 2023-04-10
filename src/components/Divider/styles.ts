import styled from 'styled-components/native';

export const StyledDividerLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[400]};
`;
