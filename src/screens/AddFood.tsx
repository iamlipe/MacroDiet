import React from 'react';
import * as Yup from 'yup';
import { Background } from '@components/Backgroud';
import { Header } from '@components/Header';
import { Scroll } from '@components/Scroll';
import { Button, Container, Input, Label } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useTheme } from 'styled-components/native';
import { useFoods } from '@hooks/useFoods';
import { NavPropsDiet } from '@routes/dietStack';

export const AddFood = () => {
  const { goBack, navigate } = useNavigation<NavPropsDiet>();
  const { effects, fonts } = useTheme();
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
          <Scroll>
            <Label
              fontFamily={fonts.family.medium}
              fontSize={fonts.size.s1}
              color={fonts.color.secundary}
              marginBottom={effects.spacing.vl}>
              Informações do alimento
            </Label>

            <Container flex={1}>
              <Input
                name="name"
                label="Nome*"
                value={values.name}
                placeholder=""
                onChangeText={handleChange('name')}
                marginBottom={effects.spacing.md}
              />

              <Input
                name="brand"
                label="Marca"
                value={values.brand}
                placeholder=""
                onChangeText={handleChange('brand')}
                marginBottom={effects.spacing.md}
              />

              <Container flexDirection="row" justifyContent="space-between">
                <Input
                  flex={2}
                  name="portionName"
                  label="Nome da porção"
                  value={values.portionName}
                  placeholder=""
                  onChangeText={handleChange('portionName')}
                  marginBottom={effects.spacing.md}
                  marginRight={effects.spacing.vs}
                />

                <Input
                  flex={1}
                  name="portion"
                  label="Porção*"
                  value={values.portion}
                  placeholder=""
                  onChangeText={handleChange('portion')}
                  marginBottom={effects.spacing.md}
                  marginLeft={effects.spacing.vs}
                />
              </Container>

              <Container flexDirection="row" justifyContent="space-between">
                <Input
                  flex={1}
                  name={'carb'}
                  label="Carboidratos*"
                  value={values.carb}
                  placeholder=""
                  onChangeText={handleChange('carb')}
                  marginBottom={effects.spacing.md}
                  marginRight={effects.spacing.vs}
                />

                <Input
                  flex={1}
                  name="prot"
                  label="Proteínas*"
                  value={values.prot}
                  placeholder=""
                  onChangeText={handleChange('prot')}
                  marginBottom={effects.spacing.md}
                  marginLeft={effects.spacing.vs}
                />
              </Container>

              <Container
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={effects.spacing.md}>
                <Input
                  flex={1}
                  name="saturatedFat"
                  label="Saturadas*"
                  value={values.saturatedFat}
                  placeholder=""
                  marginRight={effects.spacing.vs}
                  onChangeText={handleChange('saturatedFat')}
                />

                <Input
                  flex={1}
                  name="transFat"
                  label="Trans*"
                  value={values.transFat}
                  placeholder=""
                  onChangeText={handleChange('transFat')}
                  marginLeft={effects.spacing.vs}
                  marginRight={effects.spacing.vs}
                />

                <Input
                  flex={1}
                  name="totalFat"
                  label="Total*"
                  value={values.totalFat}
                  placeholder=""
                  onChangeText={handleChange('totalFat')}
                  marginLeft={effects.spacing.vs}
                />
              </Container>

              <Container
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={effects.spacing.hg}>
                <Input
                  flex={1}
                  name="fiber"
                  label="Fibras"
                  value={values.fiber}
                  placeholder=""
                  onChangeText={handleChange('fiber')}
                  marginRight={effects.spacing.vs}
                />
                <Input
                  flex={1}
                  name="sodium"
                  label="Sódio"
                  value={values.sodium}
                  placeholder=""
                  onChangeText={handleChange('sodium')}
                  marginLeft={effects.spacing.vs}
                />
              </Container>
            </Container>

            {Object.keys(errors).length ? (
              <Label marginBottom={effects.spacing.lg}>
                Preencha todos os campos obrigatorios*
              </Label>
            ) : null}

            <Button title="Adicionar" onPress={handleSubmit} />
          </Scroll>
        )}
      </Formik>
    </Background>
  );
};
