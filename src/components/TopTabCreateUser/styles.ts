import styled from 'styled-components/native';

interface Progressbar {
  progress: number;
}

export const Wrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) =>
    `${theme.effects.spacing.hg}px ${theme.effects.spacing.md}px`};
`;

export const ContainerProgressbar = styled.View`
  height: 12px;
  width: 80%;
  border-radius: ${({ theme }) => theme.effects.border.radius.pill}px;
  background-color: ${({ theme }) => theme.colors.primary[200]};
`;

export const Progressbar = styled.View<Progressbar>`
  position: absolute;
  width: ${({ progress }) => progress}%;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: ${({ theme }) => theme.effects.border.radius.pill}px;
`;

export const BaseButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;
