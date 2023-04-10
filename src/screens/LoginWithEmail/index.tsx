import React from 'react';
import * as Yup from 'yup';
import { useLogin } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@routes/auth';
import { Formik } from 'formik';
import { Background, Button, Header, Link } from '@components/index';
import { StyledInput, StyledScroll, StyledWrapperButtonSubmit } from './styles';
import { View } from 'react-native';

const LoginWithEmail = () => {
  const { goBack, navigate: navigateAuth } = useNavigation<NavPropsAuth>();
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
          <StyledScroll>
            <View>
              <StyledInput
                name="email"
                label="e-mail"
                placeholder="Ex: joao@email.com"
                value={values.email.toLowerCase()}
                onChangeText={handleChange('email')}
                error={touched.email && errors.email ? errors.email : ''}
              />

              <StyledInput
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
            </View>

            <Link
              title="Esqueceu sua senha ?"
              onPress={() => navigateAuth('RecoveryPassword')}
            />

            <StyledWrapperButtonSubmit>
              <Button
                title="Entrar"
                onPress={handleSubmit}
                disabled={loading}
              />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default LoginWithEmail;
