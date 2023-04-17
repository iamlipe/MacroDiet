import React from 'react';
import { firstLetterUppercase } from '@utils/helpers/help';
import { View } from 'react-native';
import {
  StyledContainerOption,
  StyledLabel,
  StyledError,
  StyledTitle,
  StyledDescription,
} from './styles';

interface IOption {
  value: string;
  label?: string;
  options: { key: string; name: string; description?: string }[];
  error?: string;
  onChange: (text: string) => void;
}

const Option: React.FC<IOption> = ({
  label,
  value,
  options,
  error,
  onChange,
}) => {
  return (
    <View>
      {label && <StyledLabel>{firstLetterUppercase(label)}</StyledLabel>}

      {options.map((option, index) => (
        <StyledContainerOption
          key={option.key}
          selected={option.key === value}
          onPress={() => onChange(option.key)}
          lastChild={index + 1 >= options.length}>
          <StyledTitle selected={option.key === value}>
            {firstLetterUppercase(option.name)}
          </StyledTitle>

          {option.description ? (
            <StyledDescription
              selected={
                option.key === value
              }>{`(${option.description})`}</StyledDescription>
          ) : null}
        </StyledContainerOption>
      ))}

      {error && <StyledError>{error}</StyledError>}
    </View>
  );
};

export default Option;
