import { FlatList } from 'react-native';
import styled from 'styled-components/native';

interface StyledContainerDateProps {
  selected: boolean;
}

export const StyledContainerDate = styled.TouchableOpacity<StyledContainerDateProps>`
  width: 60px;
  height: 76px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary[500] : theme.colors.black};
  margin-left: ${({ theme }) => theme.effects.spacing.sm}px;
  padding: ${({ theme }) => theme.effects.spacing.sm}px;
`;

export const StyledLabelDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  line-height: 24px;
`;

export const StyledHorizontalFlatList = styled(FlatList).attrs({
  contentContainerStyle: {
    maxHeight: 92,
  },
})`
  height: 92px;
  max-height: 92px;
  margin: ${({ theme }) => theme.effects.spacing.md}px;
`;
