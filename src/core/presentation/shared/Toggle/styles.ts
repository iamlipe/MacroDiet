import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const StyledWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledSwitchContainer = styled(Animated.View)`
  width: 60px;
  height: 32px;
  border-radius: 30px;
  justify-content: center;
`;

export const StyledSwitchCircle = styled(Animated.View)`
  width: 26px;
  height: 26px;
  border-radius: 14px;
`;

export const StyledLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
`;
