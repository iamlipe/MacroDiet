import styled from 'styled-components/native';

interface StyledWrapperCheckboxProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const StyledWrapperCheckbox = styled.TouchableOpacity<StyledWrapperCheckboxProps>`
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
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
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  border-width: ${({ theme }) => theme.effects.border.width.tl}px;
  border-color: ${({ theme }) => theme.colors.gray.white};
  margin-right: ${({ theme }) => theme.effects.spacing.vs}px;
`;

export const StyledCheckboxCheck = styled.View`
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
`;

export const StyledCheckboxLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.fonts.color.primary};
`;
