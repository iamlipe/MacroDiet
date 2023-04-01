import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeDiet } from '@screens/HomeDiet';
import React from 'react';
import { useTheme } from 'styled-components/native';

export type DietStackParamsList = {
  HomeDiet: undefined;
};

const Diet = createNativeStackNavigator<DietStackParamsList>();

export const DietStack = () => {
  const { colors } = useTheme();

  return (
    <Diet.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.dark },
      }}>
      <Diet.Screen name="HomeDiet" component={HomeDiet} />
    </Diet.Navigator>
  );
};

export type NavPropsDiet = NativeStackNavigationProp<DietStackParamsList>;
