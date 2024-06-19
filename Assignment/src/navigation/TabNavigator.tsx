import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../types/navigation';
import Routes from './routes';
import {HomeScreen, ProfileScreen} from '../screens';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
      }}>
      <Tab.Screen
        options={{title: 'Here are your tasks for today'}}
        name={Routes.Home}
        component={HomeScreen}
      />
      <Tab.Screen name={Routes.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
