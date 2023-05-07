import React, { useMemo } from 'react';
import updateGoalSchema, {
  UpdateGoalForm,
} from '@/core/infrastructure/validators/updateGoalSchema';
import { useNavigation } from '@react-navigation/native';
import {
  formatDate,
  formatMeasureForm,
  formatTimeInWeeks,
} from '@/utils/helpers/format';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { InfoProps } from '@/core/domain/models/User';
import { buildOptionForm } from '@/utils/helpers/help';
import { calculateTimeToGoal } from '@/utils/helpers/nutritionalInfo';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { useActivityStore } from '@/core/infrastructure/store/activityStore';
import { useMeasureStore } from '@/core/infrastructure/store/measureStore';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { useMeasure } from '@/core/infrastructure/hooks/useMeasure';
import { useFormik } from 'formik';
import Button from '@/core/presentation/shared/Button';
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

const EditGoalView = () => {
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { acitivityList } = useActivityStore();
  const { measureMassList } = useMeasureStore();
  const { user } = useUserStore();
  const { updateUser } = useUser();
  const { getMeasureLenghtDefault } = useMeasure();

  const defaultMeasureWeight = useMemo(() => {
    return measureMassList?.find(measure => measure.multiple === 1000) || null;
  }, [measureMassList]);

  const optionsMeasuresMass = useMemo(() => {
    if (defaultMeasureWeight) {
      return [buildOptionForm(defaultMeasureWeight)];
    }

    return [];
  }, [defaultMeasureWeight]);

  const optionsMeasuresLenght = useMemo(() => {
    const defaultMeasureLength = getMeasureLenghtDefault();

    if (defaultMeasureLength) {
      return [buildOptionForm(defaultMeasureLength)];
    }

    return [];
  }, [getMeasureLenghtDefault]);

  const optionsTimeToGoal = (values: UpdateGoalForm) => {
    return calculateTimeToGoal(
      Number(values.weight.quantity),
      Number(values.goalWeight.quantity),
    );
  };

  const initialValues = {
    height: {
      quantity: `${user?.info?.height.quantity}`,
      measureDoc: '',
    },
    weight: {
      quantity: `${user?.info?.weight.quantity}`,
      measureDoc: '',
    },
    goalWeight: {
      quantity: `${user?.info?.goalWeight.quantity}`,
      measureDoc: '',
    },
    activityLevel: user?.info?.activityDoc || '',
    time: '',
    birthDate: user?.info?.birthDate.milliseconds
      ? `${new Date(user?.info?.birthDate.milliseconds).toString()}`
      : '',
  };

  const onSubmit = async (values: UpdateGoalForm) => {
    const timeInWeeks = formatTimeInWeeks(
      optionsTimeToGoal(values),
      values.time,
    );

    if (timeInWeeks && user?.info) {
      const info: InfoProps = {
        activityDoc: values.activityLevel,
        birthDate: formatDate(values.birthDate),
        genderDoc: user?.info?.genderDoc,
        goalWeight: formatMeasureForm(values.goalWeight),
        height: formatMeasureForm(values.height),
        weight: formatMeasureForm(values.weight),
        timeInWeeks,
      };

      await updateUser({ info });
    }

    navigateLogged('ResultGoal');
  };

  const { handleChange, values, handleSubmit, errors, submitCount } = useFormik(
    {
      initialValues,
      onSubmit,
      validationSchema: toFormikValidationSchema(updateGoalSchema),
    },
  );

  return (
    <StyledScroll>
      <StyledDescription>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </StyledDescription>

      <StyledForm>
        <StyledFormRow>
          <StyledInput
            label="altura"
            placeholder="0"
            value={values.height.quantity}
            onChangeText={handleChange('height.quantity')}
          />

          <StyledSelectTwoThirds
            value={values.height.measureDoc}
            options={optionsMeasuresLenght}
            onChange={handleChange('height.measureDoc')}
          />
        </StyledFormRow>

        <StyledFormRow>
          <StyledInput
            label="peso atual"
            placeholder="0"
            value={values.weight.quantity}
            onChangeText={handleChange('weight.quantity')}
          />

          <StyledSelectTwoThirds
            value={values.weight.measureDoc}
            options={optionsMeasuresMass}
            onChange={handleChange('weight.measureDoc')}
          />
        </StyledFormRow>

        <StyledDatePicker
          label="Qual a sua data de nascimento?"
          value={values.birthDate}
          placeholder="Selecione uma data"
          onChange={handleChange('birthDate')}
        />

        <StyledSelect
          label="nivel de atividade fisica"
          value={values.activityLevel}
          options={acitivityList?.map(buildOptionForm) || []}
          onChange={handleChange('activityLevel')}
        />

        <StyledFormRow>
          <StyledInput
            label="peso meta"
            placeholder="0"
            value={values.goalWeight.quantity}
            onChangeText={handleChange('goalWeight.quantity')}
          />

          <StyledSelectTwoThirds
            value={values.goalWeight.measureDoc}
            options={optionsMeasuresMass}
            onChange={handleChange('goalWeight.measureDoc')}
          />
        </StyledFormRow>

        {typeof errors.goalWeight === 'string' && submitCount ? (
          <StyledError>{errors.goalWeight}</StyledError>
        ) : null}

        <StyledSelect
          label="Tempo para alcancar objetivo"
          value={values.time}
          options={optionsTimeToGoal(values)}
          onChange={handleChange('time')}
        />

        {Object.keys(errors).length && submitCount ? (
          <StyledError>{'preencha todos os campos por favor'}</StyledError>
        ) : null}
      </StyledForm>

      <StyledWrapperButtonSubmit>
        <Button title="salvar" onPress={handleSubmit} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default EditGoalView;
