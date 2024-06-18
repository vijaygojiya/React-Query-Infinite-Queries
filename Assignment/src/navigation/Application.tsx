import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import BootSplash from 'react-native-bootsplash';

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
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Application;
