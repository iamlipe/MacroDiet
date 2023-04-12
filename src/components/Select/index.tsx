import React, { useEffect, useMemo, useRef } from 'react';
import { firstLetterUppercase } from '@utils/stringFormat';
import { TextStyle, View, ViewStyle, Text } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '@components/BottomSheet';
import {
  StyledLabel,
  StyledContainer,
  StyledSelected,
  StyledError,
  StyledContentBottomSheet,
  StyledWrapperCardSelect,
  StyledLabelCardSelect,
} from './styles';

interface ISelect {
  name: string;
  label?: string;
  value: string;
  options: { key: string; name: string; description?: string }[];
  placeholder?: string;
  error?: string;
  onChange: (text: string) => void;
  wrapperStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const Select: React.FC<ISelect> = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Selecione',
  wrapperStyle = {},
  inputStyle = {},
  error,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const selected = useMemo(
    () => options.filter(option => option.key === value)[0],
    [options, value],
  );

  useEffect(() => {
    if (options.length <= 1) {
      onChange(options[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={wrapperStyle}>
        {label && <StyledLabel>{firstLetterUppercase(label)}</StyledLabel>}

        <StyledContainer
          disabled={options.length <= 1}
          onPress={() => bottomSheetRef.current?.present()}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <StyledSelected style={[inputStyle]}>
              {selected ? firstLetterUppercase(selected.name) : placeholder}
            </StyledSelected>

            {selected?.description ? (
              <Text
                style={{ color: '#ccc' }}>{`(${selected.description})`}</Text>
            ) : null}
          </View>
        </StyledContainer>

        {error && <StyledError>{error}</StyledError>}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['35%']}
        close={() => bottomSheetRef.current.close()}
        withScroll>
        <StyledContentBottomSheet>
          {options.map((option, index) => (
            <StyledWrapperCardSelect
              key={option.key}
              onPress={() => {
                bottomSheetRef.current?.close();
                onChange(option.key);
              }}>
              <StyledLabelCardSelect isPair={index % 2 !== 0}>
                {option.name}
              </StyledLabelCardSelect>

              {option.description ? (
                <Text
                  style={{ color: '#ccc' }}>{`(${option.description})`}</Text>
              ) : null}
            </StyledWrapperCardSelect>
          ))}
        </StyledContentBottomSheet>
      </BottomSheet>
    </>
  );
};

export default Select;
