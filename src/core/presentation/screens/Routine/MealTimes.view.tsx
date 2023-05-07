import React from 'react';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import Button from '@/core/presentation/shared/Button';
import {
  StyledScroll,
  StyledDescription,
  StyledWrapperButtonSubmit,
  StyledLabel,
  StyledInfo,
  StyledContainerCard,
  StyledWrapperInfo,
} from './styles';

const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const MealTimesView = () => {
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();

  return (
    <StyledScroll>
      <StyledDescription>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </StyledDescription>

      {user?.preferences?.mealTimes?.map(item => {
        if (!item.isActive) {
          return null;
        }

        return (
          <StyledContainerCard key={item.doc}>
            <StyledWrapperInfo>
              <StyledLabel>{item.title}</StyledLabel>
              <StyledInfo>{`${item.time.hours}:${item.time.minutes}`}</StyledInfo>
            </StyledWrapperInfo>

            <StyledInfo>{item.daysWeek.map(i => week[i]).join(' ')}</StyledInfo>
          </StyledContainerCard>
        );
      })}

      <StyledWrapperButtonSubmit>
        <Button
          title="Editar"
          onPress={() => navigateLogged('UpdateRoutine')}
        />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default MealTimesView;
