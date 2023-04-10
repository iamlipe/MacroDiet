import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Background, Header, Button } from '@components/index';
import { useGoalCalculate } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';
import { useActivityStore } from '@stores/index';
import { buildOptionForm } from '@utils/help';
import {
  StyledDescription,
  StyledInput,
  StyledScroll,
  StyledSelect,
  StyledWrapperButtonSubmit,
  StyledForm,
} from './styles';

const Goal = () => {
  const { goBack } = useNavigation();
  const { acitivities } = useActivityStore();
  const { handleGoalCalculate } = useGoalCalculate();

  const inititalValuesGoalCalculate = useMemo(() => {
    return {
      height: '',
      wieght: '',
      actitvityLevel: '',
      goalWeight: '',
      goalBodyFat: '',
      time: '',
    };
  }, []);

  const goalCalculateSchema = useMemo(
    () =>
      Yup.object().shape({
        height: Yup.string().required(),
        wieght: Yup.string().required(),
        actitvityLevel: Yup.string().required(),
        goalWeight: Yup.string().required(),
        goalBodyFat: Yup.string().required(),
        time: Yup.string().required(),
      }),
    [],
  );

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
          <StyledScroll>
            <StyledDescription>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </StyledDescription>

            <StyledForm>
              <StyledInput
                label="altura"
                name="height"
                value={values.height}
                onChangeText={handleChange('height')}
                error={touched.height && errors.height ? errors.height : ''}
              />

              <StyledInput
                name="peso atual"
                label="wieght"
                value={values.wieght}
                onChangeText={handleChange('wieght')}
                error={touched.wieght && errors.wieght ? errors.wieght : ''}
              />

              <StyledSelect
                label="nivel de atividade fisica"
                name="actitvityLevel"
                value={values.actitvityLevel}
                options={acitivities.map(buildOptionForm)}
                onChange={handleChange('actitvityLevel')}
                error={
                  touched.actitvityLevel && errors.actitvityLevel
                    ? errors.actitvityLevel
                    : ''
                }
              />

              <StyledInput
                label="meta de peso"
                name="goalWeight"
                value={values.goalWeight}
                onChangeText={handleChange('goalWeight')}
                error={
                  touched.goalWeight && errors.goalWeight
                    ? errors.goalWeight
                    : ''
                }
              />

              <StyledInput
                label="meta de gordura corporal"
                name="goalBodyFat"
                value={values.goalBodyFat}
                onChangeText={handleChange('goalBodyFat')}
                error={
                  touched.goalBodyFat && errors.goalBodyFat
                    ? errors.goalBodyFat
                    : ''
                }
              />

              <StyledSelect
                label="Tempo"
                name="time"
                value={values.time}
                options={[
                  { key: '1', name: '30 dias' },
                  { key: '2', name: '15 dias' },
                ]}
                onChange={handleChange('time')}
                error={touched.time && errors.time ? errors.time : ''}
              />
            </StyledForm>

            <StyledWrapperButtonSubmit>
              <Button title="salvar" onPress={handleSubmit} />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default Goal;
