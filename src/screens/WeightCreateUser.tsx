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

export const WeightCreateUser = () => {
  const { measures } = useMeasureStore();
  const { effects } = useTheme();
  const { initialValuesWeigth, weigthSchema, handleForm, handleValuesForm } =
    useCreateUser();

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
                name="weigth.measureId"
                value={values.weigth.measureId}
                options={measures?.mass.map(buildOptions) || []}
                onChange={handleChange('weigth.measureId')}
                marginLeft={effects.spacing.md}
                error={
                  touched.weigth?.measureId && errors.weigth?.measureId
                    ? errors.weigth?.measureId
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
