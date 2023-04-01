import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { buildOptions } from '@components/Option';
import { Scroll } from '@components/Scroll';
import { Select } from '@components/Select';
import { useCreateUser } from '@hooks/useCreateUser';
import { useMeasureStore } from '@stores/measure';
import { Formik } from 'formik';
import React from 'react';
import { useTheme } from 'styled-components/native';

export const WeightCreateUser = () => {
  const { measures } = useMeasureStore();
  const { effects, fonts } = useTheme();
  const { initialValuesWeigth, weigthSchema, handleForm, handleValuesForm } =
    useCreateUser();

  return (
    <Background>
      <Scroll>
        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.md}
        />

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
            <>
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
            </>
          )}
        </Formik>
      </Scroll>
    </Background>
  );
};
