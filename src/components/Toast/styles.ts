import styled from 'styled-components/native';

interface ContainerProps {
  width: number;
  bottom: number;
}

export const Container = styled.View<ContainerProps>`
  position: absolute;
  bottom: 0;
  width: ${({ width, theme }) => width - theme.effects.spacing.md}px;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray[500]};
  border-radius: ${({ theme }) => theme.effects.border.radius.sm}px;
  border-left-width: ${({ theme }) => theme.effects.border.width.tl}px;
  border-color: ${({ theme }) => theme.colors.status.success};
  padding: ${({ theme }) => theme.effects.spacing.md}px;
  margin-bottom: ${({ bottom, theme }) => bottom + theme.effects.spacing.sm}px;
`;

export const Info = styled.View`
  flex: 1;
  margin: 0 ${({ theme }) => theme.effects.spacing.md}px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ theme }) => theme.fonts.size.s2}px;
  color: ${({ theme }) => theme.fonts.color.primary};
  margin-bottom: ${({ theme }) => theme.effects.spacing.vs}px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.regular};
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  color: ${({ theme }) => theme.fonts.color.secundary};
`;
