import React from 'react';
import { useCreateUser } from '@hooks/useCreateUser';
import { useMeasureStore } from '@stores/measure';
import { useTheme } from 'styled-components/native';
import { Formik } from 'formik';
import {
  Background,
  Button,
  Container,
  Input,
  Scroll,
  Select,
} from '@components/index';
import * as Yup from 'yup';
import { buildOptionForm } from '@utils/help';

export const WeightCreateUser = () => {
  const { measuresMass } = useMeasureStore();
  const { effects } = useTheme();
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
          <Scroll>
            <Container flexDirection="row" alignItems="flex-end">
              <Input
                flex={1}
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
                inputStyle={{ textAlign: 'center' }}
              />

              <Select
                flex={2}
                name="weigth.measureDoc"
                value={values.weigth.measureDoc}
                options={measuresMass?.map(buildOptionForm) || []}
                onChange={handleChange('weigth.measureDoc')}
                marginLeft={effects.spacing.md}
                error={
                  touched.weigth?.measureDoc && errors.weigth?.measureDoc
                    ? errors.weigth?.measureDoc
                    : ''
                }
                inputStyle={{ textAlign: 'center' }}
              />
            </Container>

            <Container flex={1} justifyContent="flex-end">
              <Button
                title="Proximo"
                icon={{ name: 'long-arrow-right' }}
                onPress={handleSubmit}
              />
            </Container>
          </Scroll>
        )}
      </Formik>
    </Background>
  );
};
