import styled from 'styled-components/native';
import { Card } from '@components/index';

export const StyledScroll = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.effects.spacing.md,
  },
}))``;

export const StyledCardOption = styled(Card)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledPhotoUser = styled.Image`
  height: 80px;
  width: 80px;
  align-self: center;
  border-radius: ${({ theme }) => theme.effects.border.radius.circular}px;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledCircle = styled.View`
  height: 80px;
  width: 80px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.effects.border.radius.circular}px;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledInitialLetterUser = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.size.lt}px;
  color: ${({ theme }) => theme.colors.white};
`;
