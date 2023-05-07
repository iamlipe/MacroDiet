import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { MealProps } from '@/core/domain/models/Meal';
import { useMealStore } from '@/core/infrastructure/store/mealStore';
import { useMeals } from '@/core/infrastructure/hooks/useMeals';
import { useFood } from '@/core/infrastructure/hooks/useFood';
import { useTheme } from 'styled-components/native';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import {
  StyledDescription,
  StyledScroll,
  StyledAccordion,
  StyledTitleSection,
} from './styles';
import Card from '@/core/presentation/shared/Card';
import Select from '@/core/presentation/shared/Select';
import BarChart from '@/core/presentation/shared/BarChart';

const MealHistoricView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { mealList } = useMealStore();
  const { fetchMeals, handleInfoMealsDay, handleInfoMeal } = useMeals();
  const { handleFood } = useFood();
  const { effects } = useTheme();
  const { user } = useUserStore();

  useEffect(() => {
    fetchMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mealListByDate = useMemo(() => {
    const groups: { [key: string]: MealProps[] } = {};

    mealList?.forEach(item => {
      const date = moment(item.time.milliseconds).format('YYYY-MM-DD');

      if (groups[date]) {
        groups[date].push(item);
      } else {
        groups[date] = [item];
      }
    });

    return groups;
  }, [mealList]);

  const orderListByDate = (list: string[]) => {
    return list.sort((a, b) => new Date(b).getDate() - new Date(a).getDate());
  };

  const getTotalKcal = useCallback(() => {
    return orderListByDate(Object.keys(mealListByDate)).map(
      day => handleInfoMealsDay(mealListByDate[day]).totalKcalMeals,
    );
  }, [handleInfoMealsDay, mealListByDate]);

  const getDayWeek = useCallback(() => {
    return orderListByDate(Object.keys(mealListByDate)).map(day =>
      moment(new Date(day)).format('ddd'),
    );
  }, [mealListByDate]);

  const getDays = useCallback(() => {
    return orderListByDate(Object.keys(mealListByDate)).map(item => {
      return {
        key: item,
        name: moment(new Date(item)).format('DD/MM/YYYY'),
      };
    });
  }, [mealListByDate]);

  const dataMeals = useMemo(() => {
    const totalKcal: (number | undefined)[] = getTotalKcal();
    const dayWeek: (string | undefined)[] = getDayWeek();
    const days = getDays();

    if (totalKcal.length < 7) {
      const lacuna = 7 - totalKcal.length;

      for (let i = 0; i < lacuna; i++) {
        totalKcal.push(undefined);
        dayWeek.push(undefined);
      }
    }

    return { totalKcal, dayWeek, days };
  }, [getDayWeek, getDays, getTotalKcal]);

  const renderMeal = (meal: MealProps) => {
    return (
      <StyledAccordion
        key={meal.doc}
        title={meal.title}
        description={moment(new Date(meal.time.milliseconds)).format('HH:mm')}
        overview={`${handleInfoMeal(meal).totalKcal}kcal`}>
        {meal.foods.map(foodMeal => {
          return (
            <Card
              key={foodMeal.foodDoc}
              title={handleFood(foodMeal).title}
              type="none"
              description={`${handleFood(foodMeal).kcal}kcal`}
              subtitle={`${handleFood(foodMeal).quantity}g`}
            />
          );
        })}
      </StyledAccordion>
    );
  };

  return (
    <StyledScroll>
      <StyledDescription>
        O gráfico abaixo apresenta de forma visual a quantidade de calorias
        consumidas diariamente ao longo de uma semana.
      </StyledDescription>

      <BarChart
        title="Calorias"
        data={dataMeals.totalKcal.splice(0, 7).reverse()}
        goal={user?.nutritionalInfo?.kcal}
        wrapperStyle={{ marginBottom: effects.spacing.lg }}
      />

      {dataMeals.days.length ? (
        <Select
          label="dia"
          value={selectedDay || ''}
          options={dataMeals.days}
          onChange={setSelectedDay}
          wrapperStyle={{ marginBottom: effects.spacing.hg }}
        />
      ) : null}

      {selectedDay ? (
        <>
          <StyledTitleSection>Refeições</StyledTitleSection>

          {mealListByDate[selectedDay]
            ?.sort((a, b) => a.time.milliseconds - b.time.milliseconds)
            .map(meal => renderMeal(meal))}
        </>
      ) : null}
    </StyledScroll>
  );
};

export default MealHistoricView;
