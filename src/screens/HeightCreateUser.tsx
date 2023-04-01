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

export const HeightCreateUser = () => {
  const { effects, fonts } = useTheme();
  const { measures } = useMeasureStore();
  const { handleForm, initialValuesHeight, heightSchema, handleValuesForm } =
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
          initialValues={initialValuesHeight}
          validationSchema={heightSchema}
          onSubmit={values =>
            handleForm({
              values: handleValuesForm(values),
              navigateTo: 'WeightCreateUser',
            })
          }>
          {({ handleChange, values, handleSubmit, errors, touched }) => (
            <>
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
            </>
          )}
        </Formik>
      </Scroll>
    </Background>
  );
};
