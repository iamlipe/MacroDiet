import React from 'react';
import * as Yup from 'yup';
import { NavPropsDiet } from '@routes/dietStack';
import { useNavigation } from '@react-navigation/native';
import { useFoods } from '@hooks/index';
import { Formik } from 'formik';
import { Button, Header, Background } from '@components/index';
import {
  StyledScroll,
  StyledInput,
  StyledInputTwoThirds,
  StyledFormRow,
  StyledForm,
  StyledError,
  StyledDescription,
} from './styles';

const AddFood = () => {
  const { goBack, navigate } = useNavigation<NavPropsDiet>();
  const { createFood } = useFoods();

  const initialValuesAddFoods = {
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

  const addFoodSchema = Yup.object().shape({
    name: Yup.string().required(),
    portion: Yup.string().required(),
    carb: Yup.string().required(),
    prot: Yup.string().required(),
    totalFat: Yup.string().required(),
    saturatedFat: Yup.string().required(),
    transFat: Yup.string().required(),
  });

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Adicionar alimento"
      />

      <Formik
        initialValues={initialValuesAddFoods}
        validationSchema={addFoodSchema}
        onSubmit={async values => {
          await createFood(values);
          navigate('HomeDiet');
        }}>
        {({ handleChange, values, handleSubmit, errors }) => (
          <StyledScroll>
            <StyledDescription>
              Preencha as informações nutricionais do alimento
            </StyledDescription>

            <StyledForm>
              <StyledInput
                name="name"
                label="Nome*"
                value={values.name}
                placeholder="Ex: Queijo mussarela"
                onChangeText={handleChange('name')}
              />

              <StyledInput
                name="brand"
                label="Marca"
                value={values.brand}
                placeholder="Sadia"
                onChangeText={handleChange('brand')}
              />

              <StyledFormRow>
                <StyledInputTwoThirds
                  name="portionName"
                  label="Nome da porção"
                  value={values.portionName}
                  placeholder="Fatia"
                  onChangeText={handleChange('portionName')}
                />

                <StyledInput
                  name="portion"
                  label="Porção (g)*"
                  value={values.portion}
                  placeholder="0"
                  onChangeText={handleChange('portion')}
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledInput
                  name={'carb'}
                  label="Carboidratos (g)*"
                  value={values.carb}
                  placeholder="0"
                  onChangeText={handleChange('carb')}
                />

                <StyledInput
                  name="prot"
                  label="Proteínas (g)*"
                  value={values.prot}
                  placeholder="0"
                  onChangeText={handleChange('prot')}
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledInput
                  name="saturatedFat"
                  label="Saturadas (g)*"
                  value={values.saturatedFat}
                  placeholder="0"
                  onChangeText={handleChange('saturatedFat')}
                />

                <StyledInput
                  name="transFat"
                  label="Trans (g)*"
                  value={values.transFat}
                  placeholder="0"
                  onChangeText={handleChange('transFat')}
                />

                <StyledInput
                  name="totalFat"
                  label="Total (g)*"
                  value={values.totalFat}
                  placeholder="0"
                  onChangeText={handleChange('totalFat')}
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledInput
                  name="fiber"
                  label="Fibras (g)"
                  value={values.fiber}
                  placeholder="0"
                  onChangeText={handleChange('fiber')}
                />
                <StyledInput
                  name="sodium"
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

            <Button title="Adicionar" onPress={handleSubmit} />
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default AddFood;
