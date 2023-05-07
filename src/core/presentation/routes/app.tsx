import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { DietStack } from '@/core/presentation/routes/diet';
import { ProfileStack } from '@/core/presentation/routes/profile';
import BottomTabBar from '@/core/presentation/shared/BottomTabBar';
import HeaderLogo from '@/core/presentation/shared/HeaderLogo';

export type AppStackParamsList = {
  DietStack: undefined;
  ProfileStack: undefined;
  MealDetails: undefined;
};

const App = createBottomTabNavigator<AppStackParamsList>();

export const AppStack = () => {
  const renderBottomTab = (props: BottomTabBarProps) => {
    return <BottomTabBar {...props} />;
  };

  const renderHeader = () => {
    return <HeaderLogo />;
  };

  return (
    <App.Navigator
      tabBar={renderBottomTab}
      screenOptions={{
        headerShown: true,
        header: renderHeader,
      }}>
      <App.Screen name="DietStack" component={DietStack} />
      <App.Screen name="ProfileStack" component={ProfileStack} />
    </App.Navigator>
  );
};

export type NavPropsApp = BottomTabNavigationProp<AppStackParamsList>;
