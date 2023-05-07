import React, { useMemo } from 'react';
import Button from '@/core/presentation/shared/Button';
import {
  StyledInput,
  StyledScroll,
  StyledDescription,
  StyledWrapperButtonSubmit,
  StyledSelect,
  StyledFormRow,
} from './styles';
import { useFormik } from 'formik';
import { useMeasureStore } from '@/core/infrastructure/store/measureStore';
import { buildOptionForm } from '@/utils/helpers/help';

const UpdateWeightView: React.FC = () => {
  const { measureMassList } = useMeasureStore();

  const defaultMeasureWeight = useMemo(() => {
    return measureMassList?.find(measure => measure.multiple === 1000) || null;
  }, [measureMassList]);

  const optionMeasuresWeight = useMemo(() => {
    if (defaultMeasureWeight) {
      return [buildOptionForm(defaultMeasureWeight)];
    }

    return [];
  }, [defaultMeasureWeight]);

  const initialValues = {
    weight: {
      quantity: '',
      measureDoc: '',
    },
  };

  const onSubmit = () => {};

  const { handleChange, values, handleSubmit, errors, submitCount } = useFormik(
    {
      initialValues,
      onSubmit,
    },
  );

  return (
    <StyledScroll>
      <StyledDescription>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </StyledDescription>

      <StyledFormRow>
        <StyledInput
          label="Peso atual"
          placeholder="0"
          value={''}
          onChangeText={() => null}
          error={''}
        />

        <StyledSelect
          value={values.weight.measureDoc}
          options={optionMeasuresWeight}
          onChange={handleChange('weight.measureDoc')}
          error={
            submitCount && errors.weight?.measureDoc
              ? errors.weight?.measureDoc
              : ''
          }
        />
      </StyledFormRow>

      <StyledWrapperButtonSubmit>
        <Button title="Atualizar" onPress={handleSubmit} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default UpdateWeightView;
