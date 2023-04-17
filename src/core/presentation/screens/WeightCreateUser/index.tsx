import React, { useMemo } from 'react';
import weightCreateUserSchema, {
  WeightCreateUserForm,
} from '@core/infrastructure/validators/weightCreateUserSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { buildOptionForm } from '@utils/helpers/help';
import { formatMeasureForm } from '@utils/helpers/format';
import { useUser } from '@core/infrastructure/hooks/useUser';
import { useMeasureStore } from '@core/infrastructure/store/measureStore';
import { Formik } from 'formik';
import Button from '@core/presentation/shared/Button';
import Background from '@core/presentation/shared/Background';
import {
  StyledFormRow,
  StyledInput,
  StyledScroll,
  StyledSelect,
  StyledWrapperButtonSubmit,
} from './styles';

const WeightCreateUser: React.FC = () => {
  const { measureMassList } = useMeasureStore();
  const { handleFormCreateUser } = useUser();

  const defaultMeasureWeight = useMemo(() => {
    return measureMassList?.find(measure => measure.multiple === 1000) || null;
  }, [measureMassList]);

  const optionMeasuresWeight = useMemo(() => {
    if (defaultMeasureWeight) {
      return [buildOptionForm(defaultMeasureWeight)];
    }

    return [];
  }, [defaultMeasureWeight]);

  const initialValuesForm = {
    weight: {
      quantity: '',
      measureDoc: '',
    },

    goalWeight: {
      quantity: '',
      measureDoc: '',
    },
  };

  const onSubmit = (values: WeightCreateUserForm) => {
    const weight = formatMeasureForm({
      quantity: values.weight.quantity,
      measureDoc: values.weight.measureDoc,
    });

    const goalWeight = formatMeasureForm({
      quantity: values.goalWeight.quantity,
      measureDoc: values.goalWeight.measureDoc,
    });

    handleFormCreateUser({ weight, goalWeight }, 'TimeCreateUser');
  };

  return (
    <Background>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={toFormikValidationSchema(weightCreateUserSchema)}
        onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors, submitCount }) => (
          <StyledScroll>
            <StyledFormRow>
              <StyledInput
                label="Peso atual"
                placeholder="0"
                value={values.weight.quantity}
                onChangeText={handleChange('weight.quantity')}
                error={
                  submitCount && errors.weight?.quantity
                    ? errors.weight?.quantity
                    : ''
                }
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

            <StyledFormRow>
              <StyledInput
                label="Meta de peso"
                placeholder="0"
                value={values.goalWeight.quantity}
                onChangeText={handleChange('goalWeight.quantity')}
                error={
                  submitCount && errors.goalWeight?.quantity
                    ? errors.goalWeight?.quantity
                    : ''
                }
              />

              <StyledSelect
                value={values.goalWeight.measureDoc}
                options={optionMeasuresWeight}
                onChange={handleChange('goalWeight.measureDoc')}
                error={
                  submitCount && errors.goalWeight?.measureDoc
                    ? errors.goalWeight?.measureDoc
                    : ''
                }
              />
            </StyledFormRow>

            <StyledWrapperButtonSubmit>
              <Button title="Proximo" onPress={() => handleSubmit()} />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default WeightCreateUser;
