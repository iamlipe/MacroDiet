import styled from 'styled-components/native';

export const StyledModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.modal};
`;

export const StyledModalContent = styled.View`
  width: 95%;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: ${({ theme }) =>
    `${theme.effects.spacing.lg}px ${theme.effects.spacing.md}px`};
`;

export const StyledModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledModalTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledContent = styled.View`
  margin: ${({ theme }) => theme.effects.spacing.md}px 0 0;
`;
