import styled from 'styled-components/native';
import { Select, Input, Card } from '@components/index';
import { EdgeInsets } from 'react-native-safe-area-context';
import Lottie from 'lottie-react-native';

interface IStyledScroll {
  insets: EdgeInsets;
}

interface IStyledWrapperButtonSubmit {
  insets: EdgeInsets;
}

interface IStyledBoxNutrionalInfo {
  width: number;
}

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))<IStyledScroll>`
  margin-bottom: ${({ insets }) => 100 + insets.bottom}px;
`;

export const StyledFormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.effects.spacing.vl}px;
`;

export const StyledInput = styled(Input).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 1,
    marginRight: theme.effects.spacing.vs,
  },
  inputStyle: {
    textAlign: 'center',
  },
}))``;

export const StyledSelect = styled(Select).attrs(({ theme }) => ({
  wrapperStyle: {
    flex: 2,
    marginLeft: theme.effects.spacing.vs,
  },
  inputStyle: {
    textAlign: 'center',
  },
}))``;

export const StyledTitleSection = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledWrapperButtonSubmit = styled.View<IStyledWrapperButtonSubmit>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ insets }) => insets.bottom + 100}px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
  padding: ${({ insets, theme }) =>
    `0 ${theme.effects.spacing.md}px ${insets.bottom}px`};
`;

export const StyledWrapperNutritionalInfo = styled.View`
  padding: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledPortionNutritionalInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledCotainerNutrionalInfo = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const StyledBoxNutrionalInfo = styled.View<IStyledBoxNutrionalInfo>`
  width: ${({ width }) => (width - 64) * 0.31}px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  background-color: ${({ theme }) => theme.colors.primary[200]};
  margin-bottom: ${({ width }) => (width - 64) * 0.04}px;
`;

export const StyledLabelNutrionalInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const StyledCardFood = styled(Card)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledRowFoodInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledTitleFood = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.tl}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledLottieHeart = styled(Lottie)`
  width: 80px;
  height: 80px;
  margin-right: ${({ theme }) => -theme.effects.spacing.lg}px;
`;
