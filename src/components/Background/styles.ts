import styled from 'styled-components/native';

export const StyledBackground = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.dark};
`;
