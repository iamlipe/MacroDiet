import React from 'react';
import { Background } from '@components/Backgroud';
import { Container } from '@components/Container';
import { DatePicker } from '@components/DatePicker';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Scroll } from '@components/Scroll';
import { Formik } from 'formik';
import { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import { Button } from '@components/index';
import { useMeals } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';

export const AddMeal = () => {
  const { effects } = useTheme();
  const { createMeal, initialValuesCreateMeal, createMealSchema } = useMeals();
  const { navigate } = useNavigation<NavPropsDiet>();

  return (
    <Background>
      <Header title="Adicionar refeição" />

      <Formik
        initialValues={initialValuesCreateMeal}
        validationSchema={createMealSchema}
        onSubmit={async ({ mealTime, title }) => {
          await createMeal({
            time: {
              hour: new Date(mealTime).getHours(),
              minutes: new Date(mealTime).getMinutes(),
            },
            title: title,
          });

          navigate('HomeDiet');
        }}>
        {({ handleChange, values, errors, touched, handleSubmit }) => (
          <Scroll>
            <View>
              <Input
                label="Nome"
                name="title"
                value={values.title}
                onChangeText={handleChange('title')}
                marginBottom={effects.spacing.lg}
                error={touched.title && errors.title ? errors.title : ''}
              />

              <DatePicker
                name="mealTime"
                label="Horario da refeição"
                mode="time"
                onChange={handleChange('mealTime')}
                value={values.mealTime}
                marginBottom={effects.spacing.hg}
                error={
                  touched.mealTime && errors.mealTime ? errors.mealTime : ''
                }
              />
            </View>

            <Container flex={1} justifyContent="flex-end">
              <Button title="Adicionar" onPress={handleSubmit} />
            </Container>
          </Scroll>
        )}
      </Formik>
    </Background>
  );
};
