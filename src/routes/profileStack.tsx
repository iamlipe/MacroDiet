import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { MenuProfile } from '@screens/MenuProfile';
import { useTheme } from 'styled-components';

export type ProfileStackParamsList = {
  MenuProfile: undefined;
};

const Profile = createNativeStackNavigator<ProfileStackParamsList>();

export const ProfileStack = () => {
  const { colors } = useTheme();

  return (
    <Profile.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.dark },
      }}>
      <Profile.Screen name="MenuProfile" component={MenuProfile} />
    </Profile.Navigator>
  );
};

export type NavPropsProfile = NativeStackNavigationProp<ProfileStackParamsList>;
