import styled from 'styled-components/native';

interface IStyledWrapperLink {
  position: 'flex-start' | 'center' | 'flex-end';
  iconLeft?: boolean;
}

interface IStyledTitle {
  size?: number;
}

interface IStyledContainerIcon {
  iconLeft?: boolean;
}

export const StyledContainerLink = styled.TouchableOpacity.attrs({
  containerStyle: { alignSelf: 'baseline' },
})<IStyledWrapperLink>`
  flex-direction: ${({ iconLeft }) => (iconLeft ? 'row' : 'row-reverse')};
  justify-content: space-between;
  align-self: ${({ position }) => position};
`;

export const StyledTitle = styled.Text<IStyledTitle>`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ size, theme }) => size || theme.fonts.size.md}px;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.fonts.color.secundary};
  color: ${({ theme }) => theme.fonts.color.primary};
  line-height: 24px;
`;

export const StyledContainerIcon = styled.View<IStyledContainerIcon>`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-right: ${({ iconLeft, theme }) =>
    iconLeft ? 0 : theme.effects.spacing.sm}px;
`;
