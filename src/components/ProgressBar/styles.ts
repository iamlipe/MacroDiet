import styled from 'styled-components/native';

export const StyledWrapperProgressBar = styled.View`
  height: 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary[300]};
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
`;

export const StyledProgressBar = styled.View`
  height: 12px;
  width: 60%;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
`;
