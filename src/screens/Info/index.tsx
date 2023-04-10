import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import { Background, Header, DatePicker, Button } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { useUserStore } from '@stores/index';
import {
  StyledDescription,
  StyledInput,
  StyledScroll,
  StyledWrapperButtonSubmit,
} from './styles';

const Info = () => {
  const { goBack } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Informações"
      />

      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          birthDate: user.info.birthDate
            ? new Date(user.info.birthDate.milliseconds).toDateString()
            : '',
        }}
        onSubmit={values => console.log(values)}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
            <StyledDescription>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </StyledDescription>

            <View>
              <StyledInput
                name="name"
                label="nome"
                value={values.name}
                placeholder="Ex: Jose silva"
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
              <StyledInput
                name={'phone'}
                label="telefone"
                value={values.phone}
                placeholder="Ex: (11) 11111-1111"
                onChangeText={handleChange('phone')}
                error={touched.phone && errors.phone ? errors.phone : ''}
              />

              <DatePicker
                name={'birthdate'}
                label="data de aniversario"
                value={values.birthDate}
                onChange={handleChange('birthDate')}
                error={
                  touched.birthDate && errors.birthDate ? errors.birthDate : ''
                }
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

export default Info;
