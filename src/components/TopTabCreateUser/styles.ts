import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) =>
    `${theme.effects.spacing.hg}px ${theme.effects.spacing.md}px`};
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

export const StyledBaseButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

export const StyledWrapperProgressbar = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.effects.spacing.vl}px;
  align-items: center;
  justify-content: space-between;
`;
