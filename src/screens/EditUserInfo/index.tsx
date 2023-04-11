import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { View } from 'react-native';
import { Background, Header, Button } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { useUserStore } from '@stores/index';
import { StyledInput, StyledScroll, StyledWrapperButtonSubmit } from './styles';
import { useUser } from '@hooks/index';

const EditUserInfo = () => {
  const { goBack } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();
  const { updateUserInfo } = useUser();

  const initialValuesUser = {
    name: `${user.name} ${user.lastName}`,
    email: user.email,
  };

  const userSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Digite um nome valido').required('Obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail valido')
      .required('Obrigatório'),
  });

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Informações"
      />

      <Formik
        initialValues={initialValuesUser}
        validationSchema={userSchema}
        onSubmit={values => {
          updateUserInfo(values);
          goBack();
        }}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
            <View>
              <StyledInput
                name="name"
                label="nome"
                value={values.name}
                placeholder="Ex: José silva"
                onChangeText={handleChange('name')}
                error={touched.name && errors.name ? errors.name : ''}
              />
              <StyledInput
                name={'email'}
                label="email"
                value={values.email}
                placeholder="Ex: jose@email.com"
                onChangeText={handleChange('email')}
                error={touched.email && errors.email ? errors.email : ''}
              />
            </View>

            <StyledWrapperButtonSubmit>
              <Button title="salvar" onPress={handleSubmit} />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default EditUserInfo;
