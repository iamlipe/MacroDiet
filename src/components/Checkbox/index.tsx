import React from 'react';

import {
  StyledWrapperCheckbox,
  StyledCheckboxBox,
  StyledCheckboxCheck,
  StyledCheckboxContainer,
  StyledCheckboxLabel,
} from './styles';

type CheckboxProps = {
  name: string;
  value: string;
  onChange: (text: string) => void;
  label?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value: data,
  onChange,
  ...rest
}: CheckboxProps) => {
  const value: boolean = data === 'true';

  return (
    <StyledWrapperCheckbox
      onPress={() => onChange(JSON.stringify(!value))}
      {...rest}>
      <StyledCheckboxContainer>
        <StyledCheckboxBox>
          {value && <StyledCheckboxCheck />}
        </StyledCheckboxBox>

        {label && <StyledCheckboxLabel>{label}</StyledCheckboxLabel>}
      </StyledCheckboxContainer>
    </StyledWrapperCheckbox>
  );
};
