import styled from 'styled-components/native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Card } from '@components/index';
import { EdgeInsets } from 'react-native-safe-area-context';

interface IStyledWrapperButtonSubmit {
  insets: EdgeInsets;
}

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
