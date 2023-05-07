import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import editMealSchema, {
  EditMealForm,
} from '@/core/infrastructure/validators/editMealSchema';
import { MealProps } from '@/core/domain/models/Meal';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFormik } from 'formik';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { NavPropsDiet } from '@/core/presentation/routes/diet';
import { useFood } from '@/core/infrastructure/hooks/useFood';
import { useMeals } from '@/core/infrastructure/hooks/useMeals';
import { handleFoodsInMeal } from '@/utils/helpers/handleMeal';
import { useTheme } from 'styled-components/native';
import { formatDate } from '@/utils/helpers/format';
import DatePicker from '@/core/presentation/shared/DatePicker';
import Button from '@/core/presentation/shared/Button';
import BottomSheet from '@/core/presentation/shared/BottomSheet';
import Modal from '@/core/presentation/shared/Modal';
import {
  StyledForm,
  StyledInput,
  StyledScroll,
  StyledWrapperButtonSubmit,
  StyledCardFood,
  StyledTitleSection,
  StyledContainerFoods,
  StyledLinkBottomSheet,
  StyledButtonExcludeMeal,
  StyledContainerModalButtons,
  StyledDescriptionModal,
  StyledLinkModal,
} from './styles';

interface EditMealViewProps {
  dataMeal: MealProps;
  setDataMeal: Dispatch<SetStateAction<MealProps | null>>;
}

const EditMealView: React.FC<EditMealViewProps> = ({
  dataMeal,
  setDataMeal,
}) => {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { navigate: navigateDiet } = useNavigation<NavPropsDiet>();
  const { infoFood, handleFood } = useFood();
  const { updateMeal, removeMeal } = useMeals();
  const { fonts } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const food = useMemo(() => {
    if (selectedFood) {
      return infoFood(selectedFood);
    }

    return null;
  }, [infoFood, selectedFood]);

  const onPressExclude = useCallback(() => {
    if (food && dataMeal) {
      const foodsInMeal = handleFoodsInMeal('remove', dataMeal, food);

      if (foodsInMeal) {
        setDataMeal({ ...dataMeal, foods: foodsInMeal });
      }
    }

    bottomSheetRef.current?.close();
  }, [dataMeal, food, setDataMeal]);

  const onPressEdit = useCallback(() => {
    if (food && dataMeal) {
      navigateLogged('UpdateFoodInMeal', {
        type: 'edit',
        food,
        meal: dataMeal,
      });
    }

    bottomSheetRef.current?.close();
  }, [dataMeal, food, navigateLogged]);

  const onPressRemoveMeal = useCallback(async () => {
    setOpenModal(false);

    if (dataMeal) {
      await removeMeal(dataMeal.doc);
    }

    navigateDiet('HomeDiet');
  }, [dataMeal, navigateDiet, removeMeal]);

  const initialValues = {
    title: dataMeal?.title || '',
    mealTime: dataMeal?.time.milliseconds
      ? moment(new Date(dataMeal?.time.milliseconds)).format()
      : '',
  };

  const onSubmit = async (values: EditMealForm) => {
    if (dataMeal?.doc) {
      await updateMeal({
        ...dataMeal,
        title: values.title,
        time: formatDate(values.mealTime),
      });
    }

    navigateDiet('HomeDiet');
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(editMealSchema),
  });

  return (
    <React.Fragment>
      <StyledScroll insets={insets}>
        <StyledForm>
          <StyledInput
            label="Nome"
            value={values.title}
            onChangeText={handleChange('name')}
            error={touched.title && errors.title ? errors.title : ''}
          />

          <DatePicker
            label="Horario da refeição"
            mode="time"
            onChange={handleChange('mealTime')}
            value={values.mealTime}
            error={touched.mealTime && errors.mealTime ? errors.mealTime : ''}
          />
        </StyledForm>

        <StyledContainerFoods>
          <StyledTitleSection>Comidas</StyledTitleSection>

          {dataMeal?.foods.map(item => (
            <StyledCardFood
              key={item.foodDoc}
              title={handleFood(item).title}
              description={`${handleFood(item).kcal}kcal`}
              subtitle={`${handleFood(item).quantity}g`}
              type="bottomLine"
              onPress={() => {
                bottomSheetRef.current?.present();
                setSelectedFood(item.foodDoc);
              }}
            />
          ))}
        </StyledContainerFoods>
      </StyledScroll>

      <StyledWrapperButtonSubmit insets={insets}>
        <StyledButtonExcludeMeal
          title="excluir"
          type="outlined"
          onPress={() => setOpenModal(true)}
        />
        <Button title="salvar" onPress={handleSubmit} />
      </StyledWrapperButtonSubmit>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['20%']}
        close={() => bottomSheetRef.current?.close()}>
        <StyledLinkBottomSheet
          title={'Editar'}
          size={fonts.size.lg}
          icon={{ name: 'edit', size: fonts.size.md }}
          onPress={onPressEdit}
        />
        <StyledLinkBottomSheet
          title={'Excluir'}
          size={fonts.size.lg}
          icon={{ name: 'trash', size: fonts.size.md }}
          onPress={onPressExclude}
        />
      </BottomSheet>

      <Modal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        title="Excluir">
        <>
          <StyledDescriptionModal>
            Tem certeza de que deseja excluir esse item?
          </StyledDescriptionModal>

          <StyledContainerModalButtons>
            <StyledLinkModal
              title="Cancelar"
              size={fonts.size.lg}
              onPress={() => setOpenModal(false)}
            />

            <StyledLinkModal
              title="Excluir"
              size={fonts.size.lg}
              onPress={onPressRemoveMeal}
            />
          </StyledContainerModalButtons>
        </>
      </Modal>
    </React.Fragment>
  );
};

export default EditMealView;
