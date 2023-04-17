import styled from 'styled-components/native';

export const StyledContainerLoader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.modal};
`;

export const StyledLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
`;
