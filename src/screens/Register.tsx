import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { Scroll } from '@components/Scroll';
import { useRegister } from '@hooks/useRegister';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { useTheme } from 'styled-components/native';

export const Register = () => {
  const { effects, fonts } = useTheme();
  const { goBack } = useNavigation();
  const { handleRegister, initialValuesFormRegister, loading, registerSchema } =
    useRegister();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Registrar"
      />
      <Scroll>
        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.md}>
          Cadastre-se agora
        </Label>
        <Label
          fontSize={fonts.size.lg}
          color={fonts.color.secundary}
          marginBottom={effects.spacing.hg}>
          Insira seus dados pessoais para criar uma conta gratuita e começar a
          usar nosso serviço.
        </Label>

        <Formik
          initialValues={initialValuesFormRegister}
          validationSchema={registerSchema}
          onSubmit={handleRegister}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
              <Input
                name="fullName"
                label="nome completo"
                placeholder="Ex: jose silva"
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                error={
                  touched.fullName && errors.fullName ? errors.fullName : ''
                }
                marginBottom={effects.spacing.md}
              />
              <Input
                name="email"
                label="e-mail"
                placeholder="Ex: jose@email.com"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email ? errors.email : ''}
                marginBottom={effects.spacing.md}
              />
              <Input
                name="password"
                label="senha"
                placeholder="********"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={
                  touched.password && errors.password ? errors.password : ''
                }
                marginBottom={effects.spacing.md}
              />
              <Input
                name="confirmPassword"
                label="confirmar senha"
                placeholder="********"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ''
                }
                marginBottom={effects.spacing.hg}
              />

              <Container flex={1} justifyContent="flex-end">
                <Label
                  color={fonts.color.secundary}
                  marginBottom={effects.spacing.md}>
                  Ao cadastrar você concorda com nossos termos e condições
                </Label>

                <Button
                  title="Submit"
                  onPress={handleSubmit}
                  disabled={loading}
                />
              </Container>
            </>
          )}
        </Formik>
      </Scroll>
    </Background>
  );
};
