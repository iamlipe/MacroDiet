import styled from 'styled-components/native';
import Divider from '@core/presentation/shared/Divider';

export const StyledWrapper = styled.View`
  width: 100%;
  border-width: ${({ theme }) => theme.effects.border.width.df}px;
  border-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  padding: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.fonts.color.primary};
`;

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.sm}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
  margin-top: ${({ theme }) => theme.effects.spacing.sm}px;
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

export const StyledDivider = styled(Divider)`
  margin: ${({ theme }) =>
    `${theme.effects.spacing.vl}px 0 ${theme.effects.spacing.vs}px`};
`;
