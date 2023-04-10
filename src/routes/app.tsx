import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { BottomTab } from '@components/index';
import { DietStack } from './dietStack';
import { ProfileStack } from './profileStack';

export type AppStackParamsList = {
  DietStack: undefined;
  ProfileStack: undefined;
  MealDetails: undefined;
};

const App = createBottomTabNavigator<AppStackParamsList>();

export const AppStack = () => {
  const renderBottomTab = (props: BottomTabBarProps) => {
    return <BottomTab {...props} />;
  };

  return (
    <>
      <App.Navigator
        tabBar={props => renderBottomTab(props)}
        screenOptions={{ headerShown: false }}>
        <App.Screen name="DietStack" component={DietStack} />
        <App.Screen name="ProfileStack" component={ProfileStack} />
      </App.Navigator>
    </>
  );
};

export type NavPropsApp = BottomTabNavigationProp<AppStackParamsList>;
