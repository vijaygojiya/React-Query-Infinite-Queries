import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../types/navigation';
import TabNavigator from './TabNavigator';
import Routes from './routes';
import {LoginScreen, VerificationScreen} from '../screens';
import {useAuth} from '../hooks';

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootNavigator = () => {
  const {isLoggedIn} = useAuth();

  return (
    <RootStack.Navigator screenOptions={{animation: 'slide_from_left'}}>
      {isLoggedIn ? (
        <RootStack.Screen
          options={{headerShown: false}}
          component={TabNavigator}
          name={Routes.Dashboard}
        />
      ) : (
        <>
          <RootStack.Screen component={LoginScreen} name={Routes.Login} />
          <RootStack.Screen
            component={VerificationScreen}
            name={Routes.Verification}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
