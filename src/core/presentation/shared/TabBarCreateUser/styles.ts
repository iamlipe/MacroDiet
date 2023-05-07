import styled from 'styled-components/native';
import Icon from '@/core/presentation/shared/Icon';

export const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) =>
    `${theme.effects.spacing.vl}px ${theme.effects.spacing.lg}px`};
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

export const StyledLogo = styled(Icon)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;
