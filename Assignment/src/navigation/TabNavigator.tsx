import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../types/navigation';
import Routes from './routes';
import {HomeScreen, ProfileScreen} from '../screens';
import {Home, Profile} from '../assets';

const Tab = createBottomTabNavigator<TabParamList>();

const renderHomeTabIcon = (props: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return <Home stroke={props.color} />;
};

const renderProfileTabIcon = (props: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return <Profile stroke={props.color} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
      }}>
      <Tab.Screen
        options={{
          headerTitle: 'Vijay Gojiya',
          tabBarIcon: renderHomeTabIcon,
        }}
        name={Routes.Home}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{tabBarIcon: renderProfileTabIcon}}
        name={Routes.Profile}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
