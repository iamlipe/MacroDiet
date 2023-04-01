import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Label } from '@components/Label';
import { Option, buildOptions } from '@components/Option';
import { Scroll } from '@components/Scroll';
import { useCreateUser } from '@hooks/useCreateUser';
import { useGenderStore } from '@stores/gender';
import { Formik } from 'formik';
import React from 'react';
import { useTheme } from 'styled-components/native';

export const GenderCreateUser = () => {
  const { gender } = useGenderStore();
  const { handleForm, initialValuesGender, genderSchema } = useCreateUser();
  const { effects, fonts } = useTheme();

  return (
    <Background>
      <Scroll>
        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.md}
        />

        <Formik
          initialValues={initialValuesGender}
          validationSchema={genderSchema}
          onSubmit={values =>
            handleForm({ values, navigateTo: 'HeightCreateUser' })
          }>
          {({ handleChange, values, handleSubmit, errors, touched }) => (
            <>
              <Option
                name="goalId"
                label="sexo"
                value={values.genderId}
                options={gender?.map(buildOptions) || []}
                onChange={handleChange('genderId')}
                error={
                  touched.genderId && errors.genderId ? errors.genderId : ''
                }
              />

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
