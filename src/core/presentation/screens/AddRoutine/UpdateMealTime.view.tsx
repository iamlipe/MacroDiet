import React, { useMemo } from 'react';
import addRoutineSchema, {
  AddRoutineForm,
} from '@/core/infrastructure/validators/addRoutineSchema';
import { useFormik } from 'formik';
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import DatePicker from '@/core/presentation/shared/DatePicker';
import Button from '@/core/presentation/shared/Button';
import {
  StyledInput,
  StyledWrapperButtonSubmit,
  StyledScroll,
  StyledError,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { MealTimeProps } from '@/core/domain/models/MealTime';
import { useMealTime } from '@/core/infrastructure/hooks/useMealTime';
import { useTheme } from 'styled-components/native';

interface UpdateMealTimeProps {
  type: 'add' | 'remove';
  mealTime: MealTimeProps;
}

const UpdateMealTimeView: React.FC<UpdateMealTimeProps> = ({
  type,
  mealTime,
}) => {
  const { goBack } = useNavigation<NavPropsLogged>();
  const { createMealTime, updateMealTime } = useMealTime();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const dateMealTime = useMemo(() => {
    if (mealTime) {
      const date = new Date();

      date.setHours(mealTime.time.hours);
      date.setMinutes(mealTime.time.minutes);

      return date.toString();
    }

    return '';
  }, [mealTime]);

  const initialValues: AddRoutineForm = {
    daysWeek: mealTime?.daysWeek || [],
    title: mealTime?.title || '',
    time: dateMealTime,
  };

  const onSubmit = async (values: AddRoutineForm) => {
    const date = new Date(values.time);

    const time = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
    };

    if (type === 'add') {
      await createMealTime({ ...values, time });
    } else {
      await updateMealTime({ ...mealTime, ...values, time });
    }

    goBack();
  };

  const { handleChange, values, setValues, handleSubmit, errors, submitCount } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema: toFormikValidationSchema(addRoutineSchema),
    });

  // TODO
  return (
    <StyledScroll>
      <Text style={{ color: 'white' }}>Dias da semana</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {new Array(7).fill(undefined).map((_, index) => {
          return (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: ((width - 32) * 0.84) / 7,
                height: ((width - 32) * 0.84) / 7,
                backgroundColor: colors.primary[500],
              }}>
              <Text style={{ color: 'white' }}>{index}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <StyledError>
        {submitCount && errors.daysWeek ? errors.daysWeek : ''}
      </StyledError>

      <View>
        <StyledInput
          label="Nome"
          placeholder="Ex: Café da Manhã"
          value={values.title}
          onChangeText={handleChange('title')}
          error={submitCount && errors.title ? errors.title : ''}
        />

        <DatePicker
          label="Horario da refeição"
          mode="time"
          onChange={handleChange('time')}
          value={values.time}
          error={submitCount && errors.time ? errors.time : ''}
        />
      </View>

      <StyledWrapperButtonSubmit>
        <Button
          title={type === 'add' ? 'Adicionar' : 'Editar'}
          onPress={handleSubmit}
        />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default UpdateMealTimeView;
