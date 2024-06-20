import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../types/navigation';
import Routes from './routes';
import {HomeScreen, ProfileScreen} from '../screens';
import {Home, Profile} from '../assets';
import useAppTheme from '../hooks/useAppTheme';
import {Switch} from 'react-native';

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
  const {isDark, toggleTheme} = useAppTheme();

  const renderRightView = useCallback(() => {
    return <Switch value={isDark} onValueChange={toggleTheme} />;
  }, [isDark, toggleTheme]);

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
        options={{
          tabBarIcon: renderProfileTabIcon,
          headerRight: renderRightView,
        }}
        name={Routes.Profile}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
