import React, { useMemo } from 'react';
import timeCreateUserSchema, {
  TimeCreateUserForm,
} from '@core/infrastructure/validators/timeCreateUser';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useUser } from '@core/infrastructure/hooks/useUser';
import { useUserStore } from '@core/infrastructure/store/userStore';
import { calculateTimeToGoal } from '@utils/helpers/nutritionalInfo';
import { Formik } from 'formik';
import Background from '@core/presentation/shared/Background';
import Option from '@core/presentation/shared/Option';
import Button from '@core/presentation/shared/Button';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';

const TimeCreateUser: React.FC = () => {
  const { handleFormCreateUser } = useUser();
  const { formCreateUser } = useUserStore();

  const optionsTimeToGoal = useMemo(() => {
    return calculateTimeToGoal(
      formCreateUser?.weight?.quantity,
      formCreateUser?.goalWeight?.quantity,
    );
  }, [formCreateUser?.goalWeight?.quantity, formCreateUser?.weight?.quantity]);

  const initialValuesTimeGoal = {
    timeInWeeks: '',
  };

  const onSubmit = (values: TimeCreateUserForm) => {
    const timeInWeeks = optionsTimeToGoal.find(
      item => item.key === values.timeInWeeks,
    )?.value;

    handleFormCreateUser({ timeInWeeks }, 'ConclusionCreateUser');
  };

  return (
    <Background>
      <Formik
        initialValues={initialValuesTimeGoal}
        validationSchema={toFormikValidationSchema(timeCreateUserSchema)}
        onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors, submitCount }) => (
          <StyledScroll>
            <Option
              label="Defina o tempo para alcançar seu objetivo"
              value={values.timeInWeeks}
              options={optionsTimeToGoal}
              onChange={handleChange('timeInWeeks')}
              error={
                submitCount && errors.timeInWeeks ? errors.timeInWeeks : ''
              }
            />

            <StyledWrapperButtonSubmit>
              <Button title="Proximo" onPress={() => handleSubmit()} />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default TimeCreateUser;
