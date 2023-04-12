import React from 'react';
import * as Yup from 'yup';
import { useUser } from '@hooks/index';
import { useMeasureStore } from '@stores/index';
import { Formik } from 'formik';
import { Background, Button } from '@components/index';
import { buildOptionForm } from '@utils/help';
import { formatMeasureForm } from '@utils/format';
import {
  StyledFormRow,
  StyledScroll,
  StyledWrapperButtonSubmit,
  StyledSelect,
  StyledInput,
} from './styles';

const HeightCreateUser = () => {
  const { measureLengthDefault } = useMeasureStore();
  const { handleFormCreateUser } = useUser();

  const initialValuesHeight = {
    height: {
      quantity: '',
      measureDoc: '',
    },
  };

  const heightSchema = Yup.object().shape({
    height: Yup.object().shape({
      quantity: Yup.string()
        .min(1, 'Digite uma altura valida')
        .required('Digite a sua altura'),
      measureDoc: Yup.string().required('Selecione uma unidade de medida.'),
    }),
  });

  return (
    <Background>
      <Formik
        initialValues={initialValuesHeight}
        validationSchema={heightSchema}
        onSubmit={values =>
          handleFormCreateUser({
            values: { height: formatMeasureForm(values.height) },
            navigateTo: 'WeightCreateUser',
          })
        }>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
            <StyledFormRow>
              <StyledInput
                name="height.quantity"
                label="altura"
                placeholder="0"
                value={values.height.quantity}
                onChangeText={handleChange('height.quantity')}
                error={
                  touched.height?.quantity && errors.height?.quantity
                    ? errors.height?.quantity
                    : ''
                }
              />

              <StyledSelect
                name="height.measureDoc"
                value={values.height.measureDoc}
                options={[buildOptionForm(measureLengthDefault)] || []}
                onChange={handleChange('height.measureDoc')}
                error={
                  touched.height?.measureDoc && errors.height?.measureDoc
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
