import React from 'react';
import * as Yup from 'yup';
import { useCreateUser } from '@hooks/index';
import { useMeasureStore } from '@stores/index';
import { Formik } from 'formik';
import { Background, Button } from '@components/index';
import { buildOptionForm } from '@utils/help';
import {
  StyledFormRow,
  StyledInput,
  StyledScroll,
  StyledSelect,
  StyledWrapperButtonSubmit,
} from './styles';

const WeightCreateUser = () => {
  const { measuresMass } = useMeasureStore();
  const { handleForm, handleValuesForm } = useCreateUser();

  const initialValuesWeigth = {
    weigth: {
      quantity: '',
      measureDoc: '',
    },
  };

  const weigthSchema = Yup.object().shape({
    weigth: Yup.object().shape({
      quantity: Yup.string()
        .min(1, 'Digite um peso valido')
        .required('Informe o seu peso atual.'),
      measureDoc: Yup.string().required('Selecione uma unidade de medida.'),
    }),
  });

  return (
    <Background>
      <Formik
        initialValues={initialValuesWeigth}
        validationSchema={weigthSchema}
        onSubmit={values => {
          handleForm({
            values: handleValuesForm(values),
            navigateTo: 'ConclusionCreateUser',
          });
        }}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
            <StyledFormRow>
              <StyledInput
                name="weigth.quantity"
                label="Peso"
                placeholder="0"
                value={values.weigth.quantity}
                onChangeText={handleChange('weigth.quantity')}
                error={
                  touched.weigth?.quantity && errors.weigth?.quantity
                    ? errors.weigth?.quantity
                    : ''
                }
              />

              <StyledSelect
                name="weigth.measureDoc"
                value={values.weigth.measureDoc}
                options={
                  [
                    buildOptionForm(
                      measuresMass.find(measure => measure.multiple === 1000),
                    ),
                  ] || []
                }
                onChange={handleChange('weigth.measureDoc')}
                error={
                  touched.weigth?.measureDoc && errors.weigth?.measureDoc
                    ? errors.weigth?.measureDoc
                    : ''
                }
              />
            </StyledFormRow>

            <StyledWrapperButtonSubmit>
              <Button
                title="Proximo"
                icon={{ name: 'long-arrow-right' }}
                onPress={handleSubmit}
              />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default WeightCreateUser;
