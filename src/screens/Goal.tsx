import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { useTheme } from 'styled-components/native';
import {
  Background,
  Container,
  Header,
  Input,
  Label,
  Scroll,
  Button,
  Select,
} from '@components/index';
import { useGoalCalculate } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';
import { useActivityStore } from '@stores/acitivity';
import { buildOptions } from '@components/Option';

export const Goal = () => {
  const { effects, fonts } = useTheme();
  const { goBack } = useNavigation();
  const { acitivities } = useActivityStore();
  const {
    inititalValuesGoalCalculate,
    goalCalculateSchema,
    handleGoalCalculate,
  } = useGoalCalculate();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Objetivo"
      />

      <Formik
        initialValues={inititalValuesGoalCalculate}
        validationSchema={goalCalculateSchema}
        onSubmit={handleGoalCalculate}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <Label
              fontFamily={fonts.family.medium}
              fontSize={fonts.size.s1}
              color={fonts.color.secundary}
              marginBottom={effects.spacing.vl}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Label>

            <View>
              <Input
                label="altura"
                name="height"
                value={values.height}
                onChangeText={handleChange('height')}
                marginBottom={effects.spacing.md}
                error={touched.height && errors.height ? errors.height : ''}
              />

              <Input
                name="peso atual"
                label="wieght"
                value={values.wieght}
                onChangeText={handleChange('wieght')}
                marginBottom={effects.spacing.md}
                error={touched.wieght && errors.wieght ? errors.wieght : ''}
              />

              <Select
                label="nivel de atividade fisica"
                name="actitvityLevel"
                value={values.actitvityLevel}
                options={acitivities.map(buildOptions)}
                onChange={handleChange('actitvityLevel')}
                marginBottom={effects.spacing.md}
                error={
                  touched.actitvityLevel && errors.actitvityLevel
                    ? errors.actitvityLevel
                    : ''
                }
              />

              <Input
                label="meta de peso"
                name="goalWeight"
                value={values.goalWeight}
                onChangeText={handleChange('goalWeight')}
                marginBottom={effects.spacing.md}
                error={
                  touched.goalWeight && errors.goalWeight
                    ? errors.goalWeight
                    : ''
                }
              />

              <Input
                label="meta de gordura corporal"
                name="goalBodyFat"
                value={values.goalBodyFat}
                onChangeText={handleChange('goalBodyFat')}
                marginBottom={effects.spacing.md}
                error={
                  touched.goalBodyFat && errors.goalBodyFat
                    ? errors.goalBodyFat
                    : ''
                }
              />

              <Select
                label="Tempo"
                name="time"
                value={values.time}
                options={[{ key: '1', name: '30 dias' }]}
                onChange={handleChange('time')}
                marginBottom={2 * effects.spacing.hg}
                error={touched.time && errors.time ? errors.time : ''}
              />
            </View>

            <Container flex={1} justifyContent="flex-end">
              <Button title="salvar" onPress={handleSubmit} />
            </Container>
          </Scroll>
        )}
      </Formik>
    </Background>
  );
};
