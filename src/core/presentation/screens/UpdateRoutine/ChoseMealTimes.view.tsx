import React, { useRef, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { MealTimeProps } from '@/core/domain/models/MealTime';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useMealTime } from '@/core/infrastructure/hooks/useMealTime';
import Icon from '@/core/presentation/shared/Icon';
import Modal from '@/core/presentation/shared/Modal';
import Toggle from '@/core/presentation/shared/Toggle';
import Button from '@/core/presentation/shared/Button';
import BottomSheet from '@/core/presentation/shared/BottomSheet';
import {
  StyledDaysText,
  StyledRightWrapper,
  StyledTimeText,
  StyledTimeWrapper,
  StyledTitleText,
  StyledTouchableOpacity,
  StyledWrapperButtonSubmit,
  StyledScroll,
  StyledLinkBottomSheet,
  StyledContainerMealTimes,
  StyledDescriptionModal,
  StyledContainerModalButtons,
  StyledLinkModal,
  StyledContainerWarningModal,
  StyledWarningTextModal,
} from './styles';

const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

interface RoutineItemProps {
  item: MealTimeProps;
  index: number;
}

const ChoseMealTimesView = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<MealTimeProps | null>(
    null,
  );
  const [openModal, setOpenModal] = useState(false);
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();
  const { changeActiveMealTime, removeMealTime } = useMealTime();
  const { fonts, colors } = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const onPressEdit = () => {
    if (selectedRoutine) {
      bottomSheetRef.current?.close();
      navigateLogged('AddRoutine', { type: 'edit', routine: selectedRoutine });
    }
  };

  const onPressRemove = async () => {
    setOpenModal(false);

    if (selectedRoutine) {
      await removeMealTime(selectedRoutine.doc);
    }

    bottomSheetRef.current?.close();
  };

  const onPressRoutine = (item: MealTimeProps) => {
    bottomSheetRef.current?.present();
    setSelectedRoutine(item);
  };

  const renderRoutineItem = ({ index, item }: RoutineItemProps) => {
    return (
      <StyledTouchableOpacity
        key={`${item.title}-${index}`}
        onPress={() => onPressRoutine(item)}>
        <StyledTimeWrapper>
          <StyledTimeText>{`${item.time.hours}:${item.time.minutes}`}</StyledTimeText>
          <StyledTitleText>{item.title}</StyledTitleText>
        </StyledTimeWrapper>
        <StyledRightWrapper>
          <StyledDaysText>
            {item.daysWeek.map(i => week[i]).join(' ')}
          </StyledDaysText>
          <Toggle
            value={item.isActive}
            onChange={() => changeActiveMealTime(item.doc, !item.isActive)}
          />
        </StyledRightWrapper>
      </StyledTouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <StyledScroll>
        <StyledContainerMealTimes>
          {user?.preferences?.mealTimes?.map((item, index) =>
            renderRoutineItem({ item, index }),
          )}
        </StyledContainerMealTimes>

        <StyledWrapperButtonSubmit>
          <Button
            title="Adicionar"
            onPress={() => navigateLogged('AddRoutine', { type: 'add' })}
          />
        </StyledWrapperButtonSubmit>
      </StyledScroll>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['30%']}
        close={() => bottomSheetRef.current?.close()}>
        <StyledLinkBottomSheet
          title={'Editar'}
          onPress={onPressEdit}
          icon={{ name: 'edit' }}
          size={20}
        />
        <StyledLinkBottomSheet
          title={'Excluir'}
          onPress={() => setOpenModal(true)}
          icon={{ name: 'trash' }}
          size={20}
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

          <StyledContainerWarningModal>
            <Icon
              name="circle-warning"
              color={colors.status.warning}
              size={24}
            />

            <StyledWarningTextModal>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </StyledWarningTextModal>
          </StyledContainerWarningModal>

          <StyledContainerModalButtons>
            <StyledLinkModal
              title="Cancelar"
              size={fonts.size.lg}
              onPress={() => setOpenModal(false)}
            />

            <StyledLinkModal
              title="Excluir"
              size={fonts.size.lg}
              onPress={onPressRemove}
            />
          </StyledContainerModalButtons>
        </>
      </Modal>
    </React.Fragment>
  );
};

export default ChoseMealTimesView;
