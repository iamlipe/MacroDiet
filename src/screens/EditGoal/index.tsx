import React, { useCallback, useMemo } from 'react';
import * as Yup from 'yup';
import { IInfo } from '@services/firebase/models/user';
import { NavPropsLogged } from '@routes/logged';
import { Formik } from 'formik';
import { Background, Header, Button } from '@components/index';
import { useUser } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';
import { useActivityStore, useMeasureStore, useUserStore } from '@stores/index';
import { buildOptionForm } from '@utils/help';
import {
  formatDate,
  formatMeasureForm,
  formatTimeInWeeks,
} from '@utils/format';
import {
  StyledDescription,
  StyledInput,
  StyledScroll,
  StyledSelect,
  StyledSelectTwoThirds,
  StyledWrapperButtonSubmit,
  StyledForm,
  StyledFormRow,
  StyledDatePicker,
  StyledError,
} from './styles';
import { timeToGoal } from '@utils/options';

interface IUpdateUserGoal {
  height: {
    quantity: string;
    measureDoc: string;
  };
  weight: {
    quantity: string;
    measureDoc: string;
  };
  goalWeight: {
    quantity: string;
    measureDoc: string;
  };
  actitvityLevel: string;
  time: string;
  birthDate: string;
}

const EditGoal = () => {
  const { goBack, navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { acitivities } = useActivityStore();
  const { measureLengthDefault, measuresMass } = useMeasureStore();
  const { user } = useUserStore();
  const { updateUser } = useUser();

  const optionMeasure = useMemo(() => {
    return (
      [
        buildOptionForm(
          measuresMass.find(measure => measure.multiple === 1000),
        ),
      ] || []
    );
  }, [measuresMass]);

  const inititalValuesGoalCalculate: IUpdateUserGoal = {
    height: {
      quantity: `${user.info.height.quantity}`,
      measureDoc: '',
    },
    weight: {
      quantity: `${user.info.weight.quantity}`,
      measureDoc: '',
    },
    goalWeight: {
      quantity: `${user.info.goalWeight.quantity}`,
      measureDoc: '',
    },
    actitvityLevel: user.info.activityDoc,
    time: '',
    birthDate: `${new Date(user.info.birthDate.milliseconds).toString()}`,
  };

  const goalCalculateSchema = Yup.object().shape({
    height: Yup.object().shape({
      quantity: Yup.string()
        .min(1, 'Digite um peso valido')
        .required('Informe o seu peso atual.'),
      measureDoc: Yup.string().required('Selecione uma unidade de medida.'),
    }),
    weight: Yup.object().shape({
      quantity: Yup.string()
        .min(1, 'Digite um peso valido')
        .required('Informe o seu peso atual.'),
      measureDoc: Yup.string().required('Selecione uma unidade de medida.'),
    }),
    goalWeight: Yup.object()
      .shape({
        quantity: Yup.string()
          .min(1, 'Digite um peso valido')
          .required('Informe o seu peso atual.'),
        measureDoc: Yup.string().required('Selecione uma unidade de medida.'),
      })
      .test(
        'goalWeightQuantity',
        'A sua meta deve ser algo realista e possivel',
        function (value) {
          const weightQuantity = parseFloat(this.parent.weight?.quantity);
          const goalWeightQuantity = parseFloat(value.quantity || '0');
          const maxDifference = 0.1 * weightQuantity;
          return (
            goalWeightQuantity >= weightQuantity - maxDifference &&
            goalWeightQuantity <= weightQuantity + maxDifference
          );
        },
      ),
    actitvityLevel: Yup.string().required(),
    time: Yup.string().required(),
    birthDate: Yup.string().required(),
  });

  const onSubmit = useCallback(
    async (values: IUpdateUserGoal) => {
      const { birthDate, goalWeight, height, weight, actitvityLevel } = values;

      const formattedValues: IInfo = {
        activityDoc: actitvityLevel,
        birthDate: formatDate(birthDate),
        genderDoc: user.info.genderDoc,
        goalWeight: formatMeasureForm(goalWeight),
        height: formatMeasureForm(height),
        weight: formatMeasureForm(weight),
        timeInWeeks: formatTimeInWeeks(
          timeToGoal(
            Number(values.weight.quantity),
            Number(values.goalWeight.quantity),
          ),
          values.time,
        ),
      };

      await updateUser({ info: formattedValues });

      navigateLogged('ResultGoal');
    },
    [navigateLogged, updateUser, user.info.genderDoc],
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
        onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors, submitCount }) => (
          <StyledScroll>
            <StyledDescription>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </StyledDescription>

            <StyledForm>
              <StyledFormRow>
                <StyledInput
                  name="height.quantity"
                  label="altura"
                  placeholder="0"
                  value={values.height.quantity}
                  onChangeText={handleChange('height.quantity')}
                />

                <StyledSelectTwoThirds
                  name="height.measureDoc"
                  value={values.height.measureDoc}
                  options={[buildOptionForm(measureLengthDefault)] || []}
                  onChange={handleChange('height.measureDoc')}
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledInput
                  name="weight.quantity"
                  label="peso atual"
                  placeholder="0"
                  value={values.weight.quantity}
                  onChangeText={handleChange('weight.quantity')}
                />

                <StyledSelectTwoThirds
                  name="weight.measureDoc"
                  value={values.weight.measureDoc}
                  options={optionMeasure}
                  onChange={handleChange('weight.measureDoc')}
                />
              </StyledFormRow>

              <StyledDatePicker
                name="birthDate"
                label="Qual a sua data de nascimento?"
                value={values.birthDate}
                placeholder="Selecione uma data"
                onChange={handleChange('birthDate')}
              />

              <StyledSelect
                label="nivel de atividade fisica"
                name="actitvityLevel"
                value={values.actitvityLevel}
                options={acitivities.map(buildOptionForm)}
                onChange={handleChange('actitvityLevel')}
              />

              <StyledFormRow>
                <StyledInput
                  name="goalWeight.quantity"
                  label="peso meta"
                  placeholder="0"
                  value={values.goalWeight.quantity}
                  onChangeText={handleChange('goalWeight.quantity')}
                />

                <StyledSelectTwoThirds
                  name="goalWeight.measureDoc"
                  value={values.goalWeight.measureDoc}
                  options={optionMeasure}
                  onChange={handleChange('goalWeight.measureDoc')}
                />
              </StyledFormRow>

              {typeof errors.goalWeight === 'string' && submitCount ? (
                <StyledError>{errors.goalWeight}</StyledError>
              ) : null}

              <StyledSelect
                label="Tempo para alcancar objetivo"
                name="time"
                value={values.time}
                options={timeToGoal(
                  Number(values.weight.quantity),
                  Number(values.goalWeight.quantity),
                )}
                onChange={handleChange('time')}
              />

              {Object.keys(errors).length && submitCount ? (
                <StyledError>
                  {'preencha todos os campos por favor'}
                </StyledError>
              ) : null}
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

export default EditGoal;
