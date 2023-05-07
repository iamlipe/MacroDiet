import React from 'react';
import createMealSchema, {
  CreateMealForm,
} from '@/core/infrastructure/validators/createMealSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { NavPropsDiet } from '@/core/presentation/routes/diet';
import { useNavigation } from '@react-navigation/native';
import { useMeals } from '@/core/infrastructure/hooks/useMeals';
import { useFormik } from 'formik';
import {
  StyledScroll,
  StyledWrapperButtonSubmit,
  StyledInput,
  StyledForm,
} from './styles';
import DatePicker from '@/core/presentation/shared/DatePicker';
import Button from '@/core/presentation/shared/Button';

const AddMealView = () => {
  const { createMeal } = useMeals();
  const { navigate: navigateDiet } = useNavigation<NavPropsDiet>();

  const initialValues = {
    mealTime: '',
    title: '',
  };

  const onSubmit = async (values: CreateMealForm) => {
    await createMeal(values);
    navigateDiet('HomeDiet');
  };

  const { handleChange, values, errors, touched, handleSubmit } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(createMealSchema),
  });

  return (
    <StyledScroll>
      <StyledForm>
        <StyledInput
          label="Nome"
          placeholder="Ex: Café da manhã"
          value={values.title}
          onChangeText={handleChange('title')}
          error={touched.title && errors.title ? errors.title : ''}
        />

        <DatePicker
          label="Horario da refeição"
          mode="time"
          onChange={handleChange('mealTime')}
          value={values.mealTime}
          error={touched.mealTime && errors.mealTime ? errors.mealTime : ''}
        />
      </StyledForm>

      <StyledWrapperButtonSubmit>
        <Button title="Adicionar" onPress={handleSubmit} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default AddMealView;
