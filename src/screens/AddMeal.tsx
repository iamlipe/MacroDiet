import React from 'react';
import { useTheme } from 'styled-components/native';
import { useMeals } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { View } from 'react-native';
import { Formik } from 'formik';
import {
  Background,
  Container,
  DatePicker,
  Header,
  Input,
  Scroll,
  Button,
} from '@components/index';
import * as Yup from 'yup';

export const AddMeal = () => {
  const { effects } = useTheme();
  const { createMeal } = useMeals();
  const { navigate: navigateDiet } = useNavigation<NavPropsDiet>();

  const initialValuesCreateMeal = {
    mealTime: '',
    title: '',
  };

  const createMealSchema = Yup.object().shape({
    mealTime: Yup.string().required('Escolha um horario para esse refeição'),
    title: Yup.string().required('Por favor, digite o nome da refeição'),
  });

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

          navigateDiet('HomeDiet');
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
