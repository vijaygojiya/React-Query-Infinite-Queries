import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../types/navigation';
import TabNavigator from './TabNavigator';
import Routes from './routes';
import {LoginScreen} from '../screens';

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootNavigator = () => {
  const isLoggedIn = false;
  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_left'}}>
      {isLoggedIn ? (
        <RootStack.Screen component={TabNavigator} name={Routes.Dashboard} />
      ) : (
        <RootStack.Screen component={LoginScreen} name={Routes.Login} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
