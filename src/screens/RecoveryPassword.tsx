import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useTheme } from 'styled-components/native';
import {
  Background,
  Button,
  Container,
  Header,
  Input,
  Label,
  Scroll,
} from '@components/index';
import { useRecoveryPassword } from '@hooks/index';

export const RecoveryPassword = () => {
  const { goBack } = useNavigation();
  const { effects, fonts } = useTheme();
  const {
    handleRecoveryPassword,
    initialValuesRecoveryPassword,
    loading,
    recoveryPasswordSchema,
  } = useRecoveryPassword();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Recuperar senha"
      />

      <Formik
        initialValues={initialValuesRecoveryPassword}
        validationSchema={recoveryPasswordSchema}
        onSubmit={handleRecoveryPassword}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <Label
              fontFamily={fonts.family.medium}
              fontSize={fonts.size.s1}
              marginBottom={effects.spacing.md}>
              Recupere sua senha facilmente!
            </Label>
            <Label
              fontSize={fonts.size.lg}
              color={fonts.color.secundary}
              marginBottom={effects.spacing.hg}>
              Insira seu e-mail abaixo e enviaremos um link para redefinir sua
              senha. Não se preocupe, é fácil e rápido!
            </Label>

            <Input
              name="email"
              label="e-mail"
              placeholder="Ex: joao@email.com"
              value={values.email.toLowerCase()}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email ? errors.email : ''}
              marginBottom={effects.spacing.lg}
            />

            <Container flex={1} justifyContent="flex-end">
              <Button
                title="Enviar"
                disabled={loading}
                onPress={handleSubmit}
              />
            </Container>
          </Scroll>
        )}
      </Formik>
    </Background>
  );
};
