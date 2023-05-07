import styled from 'styled-components/native';
import { EdgeInsets } from 'react-native-safe-area-context';
import Icon from '../../shared/Icon';
import Link from '../../shared/Link';
import AnimatedNumbers from 'react-native-animated-numbers';

interface StyledFotterProps {
  insets: EdgeInsets;
}

export const StyledContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledContainerInfo = styled.View`
  position: absolute;
  top: 40px;
  z-index: 100;
  align-items: center;
  padding: 12px 24px;
`;

export const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  color: ${({ theme }) => theme.colors.primary[100]};
  font-size: 40px;
  margin-bottom: 24px;
`;

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  color: ${({ theme }) => theme.colors.primary[100]};
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
`;

export const StyledWrapperCups = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const StyledCupIconContainer = styled.View`
  padding: 2px;
`;

export const StyledPercentage = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  color: ${({ theme }) => theme.colors.primary[100]};
  font-size: 72px;
  margin-bottom: 24px;
`;

export const StyledFotter = styled.View<StyledFotterProps>`
  z-index: 10000000;
  position: absolute;
  width: 120px;
  height: 120px;
  align-self: center;
  bottom: ${({ insets, theme }) => insets.bottom + theme.effects.spacing.vl}px;
`;

export const StyledButtonAddWater = styled.TouchableOpacity`
  position: relative;
`;

export const StyledIconDroplet = styled(Icon)`
  position: absolute;
  left: 48px;
  top: 48px;
`;

export const StyledSelectedCup = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  color: ${({ theme }) => theme.colors.primary[100]};
  font-size: 16px;
  text-align: center;
  margin-bottom: 4px;
`;

export const StyledLinkChangeCup = styled(Link)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledRow = styled.View`
  flex-direction: row;
`;

export const StyledAnimatedNumbersPercentage = styled(AnimatedNumbers).attrs(
  ({ theme }) => ({
    fontStyle: {
      fontFamily: theme.fonts.family.bold,
      fontSize: 72,
      color: theme.colors.primary[100],
    },
  }),
)``;

export const StyledContainerBottomSheetSelectSizeCup = styled.View`
  height: 120px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const StyledCardSelectCup = styled.TouchableOpacity`
  align-items: center;
`;

export const StyledLabelCardSelectCup = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.effects.spacing.nn}px;
`;
