import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import BootSplash from 'react-native-bootsplash';
import {StatusBar} from 'react-native';
import useAppTheme from '../hooks/useAppTheme';

const Application = () => {
  const {isDark} = useAppTheme();

  const hideNativeSplashScreen = async () => {
    try {
      await BootSplash.hide({fade: true});
    } catch (error) {
      console.log('error while hiding splash screen');
    }
  };

  return (
    <NavigationContainer
      onReady={hideNativeSplashScreen}
      theme={isDark ? DarkTheme : DefaultTheme}>
      <StatusBar
        backgroundColor={isDark ? 'black' : 'white'}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Application;
