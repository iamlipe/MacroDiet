import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { formatMeasureForm } from '@/utils/helpers/format';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { useMeasure } from '@/core/infrastructure/hooks/useMeasure';
import { buildOptionForm } from '@/utils/helpers/help';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import heightCreateUserSchema, {
  HeightCreateUserForm,
} from '@/core/infrastructure/validators/heightCreateUserSchema';
import {
  StyledFormRow,
  StyledInput,
  StyledLabel,
  StyledScroll,
  StyledSelect,
  StyledWrapperButtonSubmit,
} from './styles';
import Button from '@/core/presentation/shared/Button';

const HeightCreateUserView: React.FC = () => {
  const { getMeasureLenghtDefault } = useMeasure();
  const { handleFormCreateUser } = useUser();

  const defaultMeasureLenght = useMemo(() => {
    return getMeasureLenghtDefault();
  }, [getMeasureLenghtDefault]);

  const optionMeasuresLenght = useMemo(() => {
    if (defaultMeasureLenght) {
      return [buildOptionForm(defaultMeasureLenght)];
    }

    return [];
  }, [defaultMeasureLenght]);

  const initialValues = {
    height: {
      quantity: '',
      measureDoc: '',
    },
  };

  const onSubmit = (values: HeightCreateUserForm) => {
    const height = formatMeasureForm({
      quantity: values.height.quantity,
      measureDoc: values.height.measureDoc,
    });

    handleFormCreateUser({ height }, 'WeightCreateUser');
  };

  const { handleChange, values, handleSubmit, errors, submitCount } = useFormik(
    {
      initialValues,
      onSubmit,
      validationSchema: toFormikValidationSchema(heightCreateUserSchema),
    },
  );

  return (
    <StyledScroll>
      <StyledLabel>Qual é a sua altura?</StyledLabel>

      <StyledFormRow>
        <StyledInput
          placeholder="0"
          value={values.height.quantity}
          onChangeText={handleChange('height.quantity')}
          error={
            submitCount && errors.height?.quantity
              ? errors.height?.quantity
              : ''
          }
        />

        <StyledSelect
          value={values.height.measureDoc}
          options={optionMeasuresLenght}
          onChange={handleChange('height.measureDoc')}
          error={
            submitCount && errors.height?.measureDoc
              ? errors.height?.measureDoc
              : ''
          }
        />
      </StyledFormRow>

      <StyledWrapperButtonSubmit>
        <Button
          title="Proximo"
          icon={{ name: 'long-right' }}
          onPress={handleSubmit}
        />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default HeightCreateUserView;
