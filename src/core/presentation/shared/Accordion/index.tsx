import React, { ReactNode, useState } from 'react';
import { firstLetterUppercase } from '@/utils/helpers/help';
import { useTheme } from 'styled-components/native';
import Icon from '@/core/presentation/shared/Icon';
import {
  StyledContent,
  StyledDescription,
  StyledHeader,
  StyledOverview,
  StyledOverviewContainer,
  StyledTitle,
  StyledTitleContainer,
  StyledWrapper,
  StyledDivider,
} from './styles';

interface IAccordion {
  title: string;
  description?: string;
  overview?: string;
  children: ReactNode;
}

const Accordion: React.FC<IAccordion> = ({
  title,
  description,
  overview,
  children,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();

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
            color={colors.white}
            size={24}
          />
        </StyledOverviewContainer>
      </StyledHeader>

      {expanded && <StyledDivider />}
      {expanded && <StyledContent>{children}</StyledContent>}
    </StyledWrapper>
  );
};

export default Accordion;
