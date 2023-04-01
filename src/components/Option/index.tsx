import { firstLetterUppercase } from '@utils/stringFormat';
import React from 'react';

import { Wrapper, ContainerOption, TitleOption, Label, Error } from './styles';

interface Option {
  key: string;
  name: string;
}

interface OptionProps {
  name: string;
  value: string;
  label?: string;
  options: Option[];
  error?: string;
  onChange: (text: string) => void;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const buildOptions = (raw: { id: string; title: string }) => {
  return {
    key: raw.id,
    name: raw.title,
  };
};

export const Option: React.FC<OptionProps> = ({
  name,
  label,
  value,
  options,
  error,
  onChange,
  ...rest
}) => {
  return (
    <Wrapper name={name} {...rest}>
      {label && <Label>{firstLetterUppercase(label)}</Label>}

      {options.map((option, index) => (
        <ContainerOption
          key={option.key}
          selected={option.key === value}
          onPress={() => onChange(option.key)}
          lastChild={index + 1 >= options.length}>
          <TitleOption selected={option.key === value}>
            {firstLetterUppercase(option.name)}
          </TitleOption>
        </ContainerOption>
      ))}

      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};
