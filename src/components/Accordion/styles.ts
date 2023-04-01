import styled from 'styled-components/native';

interface StyledWrapperProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const StyledWrapper = styled.View<StyledWrapperProps>`
  width: 100%;
  border-width: ${({ theme }) => theme.effects.border.width.df}px;
  border-color: ${({ theme }) => theme.colors.gray.white};
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;

export const StyledHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.sm}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
`;

export const StyledOverview = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.md}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-right: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledTitleContainer = styled.View`
  flex: 1;
`;

export const StyledOverviewContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledContent = styled.View`
  padding: ${({ theme }) => theme.effects.spacing.md}px 0;
`;
