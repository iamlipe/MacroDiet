import React, { useMemo } from 'react';
import activityCreateUserSchema, {
  ActivityCreateUserForm,
} from '@/core/infrastructure/validators/activityCreateUserSchema';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import {
  StyledLabel,
  StyledOption,
  StyledScroll,
  StyledWrapperButtonSubmit,
} from './styles';
import { useActivityStore } from '@/core/infrastructure/store/activityStore';
import Button from '@/core/presentation/shared/Button';
import { buildOptionForm } from '@/utils/helpers/help';

const ActivityCreateUserView: React.FC = () => {
  const { acitivityList } = useActivityStore();
  const { handleFormCreateUser } = useUser();

  const activities = useMemo(() => {
    return (
      acitivityList
        ?.map(item => {
          return {
            ...buildOptionForm(item),
            description: item.description,
          };
        })
        .reverse() || []
    );
  }, [acitivityList]);

  const initialValues = {
    activityDoc: '',
  };

  const onSubmit = (values: ActivityCreateUserForm) => {
    handleFormCreateUser(values, 'HeightCreateUser');
  };

  const { handleChange, values, handleSubmit, errors, submitCount } = useFormik(
    {
      initialValues,
      onSubmit,
      validationSchema: toFormikValidationSchema(activityCreateUserSchema),
    },
  );

  return (
    <StyledScroll>
      <StyledLabel>Qual é o seu nível de atividade física?</StyledLabel>

      <StyledOption
        value={values.activityDoc}
        options={activities}
        onChange={handleChange('activityDoc')}
        error={submitCount && errors.activityDoc ? errors.activityDoc : ''}
      />

      <StyledWrapperButtonSubmit>
        <Button
          title="Proximo"
          icon={{ name: 'long-right' }}
          onPress={handleSubmit}
        />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default ActivityCreateUserView;
