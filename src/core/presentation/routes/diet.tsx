import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HomeDiet from '@/core/presentation/screens/HomeDiet';

export type DietStackParamsList = {
  HomeDiet: undefined;
};

const Diet = createNativeStackNavigator<DietStackParamsList>();

export const DietStack = () => {
  return (
    <Diet.Navigator screenOptions={{ headerShown: false }}>
      <Diet.Screen name="HomeDiet" component={HomeDiet} />
    </Diet.Navigator>
  );
};

export type NavPropsDiet = NativeStackNavigationProp<DietStackParamsList>;
