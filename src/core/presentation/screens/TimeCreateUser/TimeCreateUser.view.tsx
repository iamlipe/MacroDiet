import React, { useMemo } from 'react';
import timeCreateUserSchema, {
  TimeCreateUserForm,
} from '@/core/infrastructure/validators/timeCreateUser';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { calculateTimeToGoal } from '@/utils/helpers/nutritionalInfo';
import { useFormik } from 'formik';
import { StyledLabel, StyledScroll, StyledWrapperButtonSubmit } from './styles';
import Option from '@/core/presentation/shared/Option';
import Button from '@/core/presentation/shared/Button';

const TimeCreateUserView: React.FC = () => {
  const { handleFormCreateUser } = useUser();
  const { formCreateUser } = useUserStore();

  const optionsTimeToGoal = useMemo(() => {
    return calculateTimeToGoal(
      formCreateUser?.weight?.quantity || 0,
      formCreateUser?.goalWeight?.quantity || 0,
    );
  }, [formCreateUser?.goalWeight?.quantity, formCreateUser?.weight?.quantity]);

  const initialValues = {
    timeInWeeks: '',
  };

  const onSubmit = (values: TimeCreateUserForm) => {
    const timeInWeeks = optionsTimeToGoal.find(
      item => item.key === values.timeInWeeks,
    )?.value;

    handleFormCreateUser({ timeInWeeks }, 'ConclusionCreateUser');
  };

  const { handleChange, values, handleSubmit, errors, submitCount } = useFormik(
    {
      initialValues,
      onSubmit,
      validationSchema: toFormikValidationSchema(timeCreateUserSchema),
    },
  );

  return (
    <StyledScroll>
      <StyledLabel>
        Em quanto tempo você deseja alcançar seu objetivo?
      </StyledLabel>

      <Option
        value={values.timeInWeeks}
        options={optionsTimeToGoal}
        onChange={handleChange('timeInWeeks')}
        error={submitCount && errors.timeInWeeks ? errors.timeInWeeks : ''}
      />

      <StyledWrapperButtonSubmit>
        <Button
          title="Proximo"
          icon={{ name: 'long-right' }}
          onPress={() => handleSubmit()}
        />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default TimeCreateUserView;
