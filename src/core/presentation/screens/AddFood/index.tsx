import React from 'react';
import createFoodSchema, {
  CreateFoodForm,
} from '@core/infrastructure/validators/createFoodSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { NavPropsDiet } from '@core/presentation/routes/diet';
import { useNavigation } from '@react-navigation/native';
import { useFood } from '@core/infrastructure/hooks/useFood';
import { Formik } from 'formik';
import Background from '@core/presentation/shared/Background';
import {
  StyledScroll,
  StyledInput,
  StyledInputTwoThirds,
  StyledFormRow,
  StyledForm,
  StyledError,
  StyledDescription,
  StyledButtonSubmit,
} from './styles';

const AddFood = () => {
  const { navigate } = useNavigation<NavPropsDiet>();
  const { createFood } = useFood();

  const initialValuesForm = {
    name: '',
    brand: '',
    portionName: '',
    portion: '',
    carb: '',
    prot: '',
    fiber: '',
    sodium: '',
    totalFat: '',
    saturatedFat: '',
    transFat: '',
  };

  const onSubmit = async (values: CreateFoodForm) => {
    await createFood(values);
    navigate('HomeDiet');
  };

  return (
    <Background>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={toFormikValidationSchema(createFoodSchema)}
        onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors }) => (
          <StyledScroll>
            <StyledDescription>
              Preencha as informações nutricionais do alimento
            </StyledDescription>

            <StyledForm>
              <StyledInput
                label="Nome*"
                value={values.name}
                placeholder="Ex: Queijo mussarela"
                onChangeText={handleChange('name')}
              />

              <StyledInput
                label="Marca"
                value={values.brand}
                placeholder="Sadia"
                onChangeText={handleChange('brand')}
              />

              <StyledFormRow>
                <StyledInputTwoThirds
                  label="Nome da porção"
                  value={values.portionName}
                  placeholder="Fatia"
                  onChangeText={handleChange('portionName')}
                />

                <StyledInput
                  label="Porção (g)*"
                  value={values.portion}
                  placeholder="0"
                  onChangeText={handleChange('portion')}
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledInput
                  label="Carboidratos (g)*"
                  value={values.carb}
                  placeholder="0"
                  onChangeText={handleChange('carb')}
                />

                <StyledInput
                  label="Proteínas (g)*"
                  value={values.prot}
                  placeholder="0"
                  onChangeText={handleChange('prot')}
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledInput
                  label="Saturadas (g)*"
                  value={values.saturatedFat}
                  placeholder="0"
                  onChangeText={handleChange('saturatedFat')}
                />

                <StyledInput
                  label="Trans (g)*"
                  value={values.transFat}
                  placeholder="0"
                  onChangeText={handleChange('transFat')}
                />

                <StyledInput
                  label="Total (g)*"
                  value={values.totalFat}
                  placeholder="0"
                  onChangeText={handleChange('totalFat')}
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledInput
                  label="Fibras (g)"
                  value={values.fiber}
                  placeholder="0"
                  onChangeText={handleChange('fiber')}
                />
                <StyledInput
                  label="Sódio (mg)"
                  value={values.sodium}
                  placeholder="0"
                  onChangeText={handleChange('sodium')}
                />
              </StyledFormRow>
            </StyledForm>

            {Object.keys(errors).length ? (
              <StyledError>Preencha todos os campos obrigatorios*</StyledError>
            ) : null}

            <StyledButtonSubmit title="Adicionar" onPress={handleSubmit} />
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default AddFood;
