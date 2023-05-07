import styled from 'styled-components/native';

export const StyledWrapperCheckbox = styled.TouchableOpacity`
  flex: 1;
`;

export const StyledCheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledCheckboxBox = styled.View`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  border-width: ${({ theme }) => theme.effects.border.width.tl}px;
  border-color: ${({ theme }) => theme.colors.white};
  margin-right: ${({ theme }) => theme.effects.spacing.vs}px;
`;

export const StyledCheckboxCheck = styled.View`
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
`;

export const StyledCheckboxLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.fonts.color.primary};
`;
