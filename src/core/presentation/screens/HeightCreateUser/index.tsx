import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { formatMeasureForm } from '@utils/helpers/format';
import { useUser } from '@core/infrastructure/hooks/useUser';
import { useMeasure } from '@core/infrastructure/hooks/useMeasure';
import { buildOptionForm } from '@utils/helpers/help';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import heightCreateUserSchema, {
  HeightCreateUserForm,
} from '@core/infrastructure/validators/heightCreateUserSchema';
import Background from '@core/presentation/shared/Background';
import Button from '@core/presentation/shared/Button';
import {
  StyledFormRow,
  StyledInput,
  StyledScroll,
  StyledSelect,
  StyledWrapperButtonSubmit,
} from './styles';

const HeightCreateUser: React.FC = () => {
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

  const initialValuesForm = {
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

  return (
    <Background>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={toFormikValidationSchema(heightCreateUserSchema)}
        onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors, submitCount }) => (
          <StyledScroll>
            <StyledFormRow>
              <StyledInput
                label="altura"
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
              <Button title="Proximo" onPress={handleSubmit} />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default HeightCreateUser;
