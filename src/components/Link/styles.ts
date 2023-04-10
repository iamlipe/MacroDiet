import styled from 'styled-components/native';

interface IStyledWrapperLink {
  position: 'flex-start' | 'center' | 'flex-end';
}

interface IStyledTitle {
  link?: boolean;
}

interface IStyledContainerIcon {
  iconLeft?: boolean;
}

export const StyledContainerLink = styled.TouchableOpacity.attrs({
  containerStyle: { alignSelf: 'baseline' },
})<IStyledWrapperLink>`
  flex-direction: row;
  justify-content: space-between;
  align-self: ${({ position }) => position};
`;

export const StyledTitle = styled.Text<IStyledTitle>`
  font-family: ${({ theme }) => theme.fonts.family.medium};
  font-size: ${({ link, theme }) =>
    link ? theme.fonts.size.md : theme.fonts.size.s2}px;
  text-decoration: ${({ link }) => (link ? 'underline' : 'none')};
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
    iconLeft ? theme.effects.spacing.md : 0}px;
`;
