import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import HistoricMeal from '@/core/presentation/screens/HistoricMeal';
import HistoricWeight from '@/core/presentation/screens/HistoricWeight';
import HistoricWater from '@/core/presentation/screens/HistoricWater';
import { useTheme } from 'styled-components/native';

export type HistoricStackParamsList = {
  HistoricMeal: undefined;
  HistoricWeight: undefined;
  HistoricWater: undefined;
};

const Historic = createMaterialTopTabNavigator<HistoricStackParamsList>();

export const HistoricStack = () => {
  const { colors, fonts, effects } = useTheme();

  return (
    <Historic.Navigator
      sceneContainerStyle={{ backgroundColor: colors.background.dark }}
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary[500],
          height: effects.border.width.tl,
          borderRadius: effects.border.radius.pill,
        },

        tabBarLabelStyle: {
          fontFamily: fonts.family.medium,
          fontSize: fonts.size.s2,
          textTransform: 'none',
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: colors.background.dark,
        },
      }}>
      <Historic.Screen
        name="HistoricMeal"
        component={HistoricMeal}
        options={{ title: 'Dieta' }}
      />
      <Historic.Screen
        name="HistoricWater"
        component={HistoricWater}
        options={{ title: 'Água' }}
      />
      <Historic.Screen
        name="HistoricWeight"
        component={HistoricWeight}
        options={{ title: 'Peso' }}
      />
    </Historic.Navigator>
  );
};

export type NavPropsHistoric =
  MaterialTopTabNavigationProp<HistoricStackParamsList>;
