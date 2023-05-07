import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

interface StyledLinearGradientProps {
  width: number;
  height: number;
}

interface StyledImageProps {
  width: number;
  height: number;
}

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: theme.effects.spacing.vl,
    paddingHorizontal: theme.effects.spacing.md,
    justifyContent: 'flex-end',
  },
}))``;

export const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.effects.spacing.lg}px;
`;

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledLinearGradient = styled(LinearGradient).attrs({
  colors: ['#00000066', '#000000'],
})<StyledLinearGradientProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export const StyledImage = styled.Image<StyledImageProps>`
  position: absolute;
  right: -60px;
  top: -80px;
  z-index: -2;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
