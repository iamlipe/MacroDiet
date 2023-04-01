import { DividerLine } from '@components/Divider/styles';
import { Icon } from '@components/Icon';
import { firstLetterUppercase } from '@utils/stringFormat';
import React, { ReactNode, useState } from 'react';
import { useTheme } from 'styled-components/native';

import {
  StyledContent,
  StyledDescription,
  StyledHeader,
  StyledOverview,
  StyledOverviewContainer,
  StyledTitle,
  StyledTitleContainer,
  StyledWrapper,
} from './styles';

interface AccordionProps {
  title: string;
  description?: string;
  overview?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  description,
  overview,
  children,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(false);
  const { colors, fonts, effects } = useTheme();

  return (
    <StyledWrapper {...rest}>
      <StyledHeader onPress={() => setExpanded(!expanded)}>
        <StyledTitleContainer>
          <StyledTitle>{firstLetterUppercase(title)}</StyledTitle>
          {description && <StyledDescription>{description}</StyledDescription>}
        </StyledTitleContainer>

        <StyledOverviewContainer>
          {overview && <StyledOverview>{overview}</StyledOverview>}
          <Icon
            name={expanded ? 'down' : 'up'}
            color={colors.gray.white}
            size={fonts.size.md}
          />
        </StyledOverviewContainer>
      </StyledHeader>

      {expanded && <DividerLine marginTop={effects.spacing.md} />}
      {expanded && <StyledContent>{children}</StyledContent>}
    </StyledWrapper>
  );
};
