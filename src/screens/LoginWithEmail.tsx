import React from 'react';
import * as Yup from 'yup';
import { useLogin } from '@hooks/useLogin';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@routes/auth';
import { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import { Formik } from 'formik';
import {
  Background,
  Button,
  Container,
  Header,
  Input,
  Scroll,
} from '@components/index';

export const LoginWithEmail = () => {
  const { goBack, navigate: navigateAuth } = useNavigation<NavPropsAuth>();
  const { effects } = useTheme();
  const { loginWithEmail, loading } = useLogin();

  const initialValuesLoginWithEmail = {
    email: '',
    password: '',
  };

  const loginWithEmailSchema = Yup.object().shape({
    email: Yup.string().email('email invalido').required(),
    password: Yup.string()
      .required()
      .min(8, 'Senha deve ter no mínimo 8 caracteres'),
  });

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Entrar com email"
      />

      <Formik
        initialValues={initialValuesLoginWithEmail}
        validationSchema={loginWithEmailSchema}
        onSubmit={values => loginWithEmail(values)}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <View>
              <Input
                name="email"
                label="e-mail"
                placeholder="Ex: joao@email.com"
                value={values.email.toLowerCase()}
                onChangeText={handleChange('email')}
                error={touched.email && errors.email ? errors.email : ''}
                marginBottom={effects.spacing.lg}
              />

              <Input
                name="password"
                label="Senha"
                placeholder="********"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                error={
                  touched.password && errors.password ? errors.password : ''
                }
                marginBottom={effects.spacing.lg}
              />

              <Button
                type="link"
                title="Esqueceu sua senha ?"
                onPress={() => navigateAuth('RecoveryPassword')}
              />
            </View>

            <Container flex={1} justifyContent="flex-end">
              <Button
                title="Entrar"
                onPress={handleSubmit}
                disabled={loading}
              />
            </Container>
          </Scroll>
        )}
      </Formik>
    </Background>
  );
};
