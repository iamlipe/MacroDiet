import React from 'react';
import { buildOptions } from '@components/Option';
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

export const HeightCreateUser = () => {
  const { effects } = useTheme();
  const { measures } = useMeasureStore();
  const { handleForm, handleValuesForm } = useCreateUser();

  const initialValuesHeight = {
    height: {
      quantity: '',
      measureId: '',
    },
  };

  const heightSchema = Yup.object().shape({
    height: Yup.object().shape({
      quantity: Yup.string()
        .min(1, 'Digite uma altura valida')
        .required('Digite a sua altura'),
      measureId: Yup.string().required('Selecione uma unidade de medida.'),
    }),
  });

  return (
    <Background>
      <Formik
        initialValues={initialValuesHeight}
        validationSchema={heightSchema}
        onSubmit={values =>
          handleForm({
            values: handleValuesForm(values),
            navigateTo: 'WeightCreateUser',
          })
        }>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <Container flexDirection="row" alignItems="flex-end">
              <Input
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
                inputStyle={{ textAlign: 'center' }}
              />

              <Select
                flex={2}
                name="height.measureId"
                value={values.height.measureId}
                options={measures?.length.map(buildOptions) || []}
                onChange={handleChange('height.measureId')}
                marginLeft={effects.spacing.md}
                error={
                  touched.height?.measureId && errors.height?.measureId
                    ? errors.height?.measureId
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
