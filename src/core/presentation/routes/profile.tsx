import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MenuProfile from '@core/presentation/screens/MenuProfile';

export type ProfileStackParamsList = {
  MenuProfile: undefined;
};

const Profile = createNativeStackNavigator<ProfileStackParamsList>();

export const ProfileStack = () => {
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="MenuProfile" component={MenuProfile} />
    </Profile.Navigator>
  );
};

export type NavPropsProfile = NativeStackNavigationProp<ProfileStackParamsList>;
