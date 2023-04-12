import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { useMeasureStore } from '@stores/index';
import { Formik } from 'formik';
import { Background, Button } from '@components/index';
import { buildOptionForm } from '@utils/help';
import { formatMeasureForm } from '@utils/format';
import { useUser } from '@hooks/index';
import {
  StyledFormRow,
  StyledInput,
  StyledScroll,
  StyledSelect,
  StyledWrapperButtonSubmit,
  StyledError,
} from './styles';

const WeightCreateUser = () => {
  const { measuresMass } = useMeasureStore();
  const { handleFormCreateUser } = useUser();

  const optionMeasure = useMemo(() => {
    return (
      [
        buildOptionForm(
          measuresMass.find(measure => measure.multiple === 1000),
        ),
      ] || []
    );
  }, [measuresMass]);

  const initialValuesWeigth = {
    weight: {
      quantity: '',
      measureDoc: '',
    },
    goalWeight: {
      quantity: '',
      measureDoc: '',
    },
  };

  const weigthSchema = Yup.object().shape({
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
  });

  return (
    <Background>
      <Formik
        initialValues={initialValuesWeigth}
        validationSchema={weigthSchema}
        onSubmit={values => {
          handleFormCreateUser({
            values: {
              weight: formatMeasureForm(values.weight),
              goalWeight: formatMeasureForm(values.goalWeight),
            },
            navigateTo: 'TimeGoalCreateUser',
          });
        }}>
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          touched,
          submitCount,
        }) => (
          <StyledScroll>
            <StyledFormRow>
              <StyledInput
                name="weight.quantity"
                label="Peso atual"
                placeholder="0"
                value={values.weight.quantity}
                onChangeText={handleChange('weight.quantity')}
                error={
                  touched.weight?.quantity && errors.weight?.quantity
                    ? errors.weight?.quantity
                    : ''
                }
              />

              <StyledSelect
                name="weight.measureDoc"
                value={values.weight.measureDoc}
                options={optionMeasure}
                onChange={handleChange('weight.measureDoc')}
                error={
                  touched.weight?.measureDoc && errors.weight?.measureDoc
                    ? errors.weight?.measureDoc
                    : ''
                }
              />
            </StyledFormRow>

            <StyledFormRow>
              <StyledInput
                name="goalWeight.quantity"
                label="Meta de peso"
                placeholder="0"
                value={values.goalWeight.quantity}
                onChangeText={handleChange('goalWeight.quantity')}
                error={
                  touched.goalWeight?.quantity && errors.goalWeight?.quantity
                    ? errors.goalWeight?.quantity
                    : ''
                }
              />

              <StyledSelect
                name="goalWeight.measureDoc"
                value={values.goalWeight.measureDoc}
                options={optionMeasure}
                onChange={handleChange('goalWeight.measureDoc')}
                error={
                  touched.goalWeight?.measureDoc &&
                  errors.goalWeight?.measureDoc
                    ? errors.goalWeight?.measureDoc
                    : ''
                }
              />
            </StyledFormRow>

            {typeof errors.goalWeight === 'string' && submitCount ? (
              <StyledError>{errors.goalWeight}</StyledError>
            ) : null}

            <StyledWrapperButtonSubmit>
              <Button title="Proximo" onPress={handleSubmit} />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default WeightCreateUser;
