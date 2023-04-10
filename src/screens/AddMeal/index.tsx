import React from 'react';
import * as Yup from 'yup';
import { useMeals } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { Formik } from 'formik';
import { Background, DatePicker, Header, Button } from '@components/index';
import {
  StyledScroll,
  StyledWrapperButtonSubmit,
  StyledInput,
  StyledForm,
} from './styles';

const AddMeal = () => {
  const { createMeal } = useMeals();
  const { goBack, navigate: navigateDiet } = useNavigation<NavPropsDiet>();

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
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Adicionar refeição"
      />

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
          <StyledScroll>
            <StyledForm>
              <StyledInput
                label="Nome"
                name="title"
                value={values.title}
                onChangeText={handleChange('title')}
                error={touched.title && errors.title ? errors.title : ''}
              />

              <DatePicker
                name="mealTime"
                label="Horario da refeição"
                mode="time"
                onChange={handleChange('mealTime')}
                value={values.mealTime}
                error={
                  touched.mealTime && errors.mealTime ? errors.mealTime : ''
                }
              />
            </StyledForm>

            <StyledWrapperButtonSubmit>
              <Button title="Adicionar" onPress={handleSubmit} />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default AddMeal;
