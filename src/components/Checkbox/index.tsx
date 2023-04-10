import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  StyledWrapperCheckbox,
  StyledCheckboxBox,
  StyledCheckboxCheck,
  StyledCheckboxContainer,
  StyledCheckboxLabel,
} from './styles';

interface ICheckbox extends TouchableOpacity {
  name: string;
  value: string;
  onChange: (text: string) => void;
  label?: string;
}

export const Checkbox: React.FC<ICheckbox> = ({
  label,
  value: data,
  onChange,
  ...rest
}) => {
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

export default Checkbox;
