import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Scroll } from '@components/Scroll';
import { useLogin } from '@hooks/useLogin';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@routes/auth';
import { Formik } from 'formik';
import React from 'react';
import { useTheme } from 'styled-components/native';

export const LoginWithEmail = () => {
  const { goBack } = useNavigation<NavPropsAuth>();
  const { effects } = useTheme();
  const { loginWithEmail, initialValuesLoginWithEmail, loginWithEmailSchema } =
    useLogin();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Entrar com email"
      />

      <Scroll>
        <Formik
          initialValues={initialValuesLoginWithEmail}
          validationSchema={loginWithEmailSchema}
          onSubmit={values => loginWithEmail(values)}>
          {({ handleChange, values, handleSubmit, errors, touched }) => (
            <>
              <Input
                name="email"
                label="e-mail"
                placeholder="Ex: joao@email.com"
                value={values.email}
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
              />

              <Container flex={1} justifyContent="flex-end">
                <Button
                  title="Entrar"
                  icon={{ name: 'long-arrow-right' }}
                  onPress={handleSubmit}
                />
              </Container>
            </>
          )}
        </Formik>
      </Scroll>
    </Background>
  );
};
