import React from 'react';
import * as Yup from 'yup';
import { useRegister } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Background, Button, Header } from '@components/index';
import {
  StyledInput,
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
  StyledTerms,
} from './styles';

const Register = () => {
  const { goBack } = useNavigation();
  const { handleRegister, loading } = useRegister();

  const initialValuesFormRegister = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const registerSchema = Yup.object().shape({
    fullName: Yup.string()
      .matches(
        /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
        'Por favor, insira um nome completo válido',
      )
      .required(),
    email: Yup.string().email('email invalido').required(),
    password: Yup.string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
      .required(),
  });

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Registrar"
      />
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
          <StyledScroll>
            <StyledTitle> Cadastre-se agora</StyledTitle>
            <StyledSubtitle>
              Insira seus dados pessoais para criar uma conta gratuita e começar
              a usar nosso serviço.
            </StyledSubtitle>

            <StyledInput
              name="fullName"
              label="nome completo"
              placeholder="Ex: jose silva"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              error={touched.fullName && errors.fullName ? errors.fullName : ''}
            />
            <StyledInput
              name="email"
              label="e-mail"
              placeholder="Ex: jose@email.com"
              value={values.email.toLowerCase()}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email ? errors.email : ''}
            />
            <StyledInput
              name="password"
              label="senha"
              placeholder="********"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password ? errors.password : ''}
            />
            <StyledInput
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
            />

            <StyledWrapperButtonSubmit>
              <StyledTerms>
                Ao cadastrar você concorda com nossos termos e condições
              </StyledTerms>

              <Button
                title="Registrar"
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

export default Register;
