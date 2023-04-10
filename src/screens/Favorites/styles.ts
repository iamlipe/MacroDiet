import styled from 'styled-components/native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Card } from '@components/index';

export const StyledDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.s1}px;
  color: ${({ theme }) => theme.colors.gray[200]};
  line-height: 28px;
  margin-bottom: ${({ theme }) => theme.effects.spacing.hg}px;
`;

export const StyledCardFood = styled(Card)`
  margin-bottom: ${({ theme }) => theme.effects.spacing.md}px;
`;

export const StyledDraggableFlatList = styled(DraggableFlatList).attrs(
  ({ theme }) => ({
    contentContainerStyle: {
      paddingHorizontal: theme.effects.spacing.md,
      paddingVertical: theme.effects.spacing.vl,
    },
    containerStyle: {
      flexGrow: 1,
    },
  }),
)``;
