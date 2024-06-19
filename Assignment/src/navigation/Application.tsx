import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import BootSplash from 'react-native-bootsplash';
import {StatusBar} from 'react-native';

const Application = () => {
  const hideNativeSplashScreen = async () => {
    try {
      await BootSplash.hide({fade: true});
    } catch (error) {
      console.log('error while hiding splash screen');
    }
  };
  return (
    <NavigationContainer onReady={hideNativeSplashScreen}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Application;
