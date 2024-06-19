import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Routes from '../navigation/routes';

export type RootStackParamsList = {
  [Routes.Login]: undefined;
  [Routes.Verification]: undefined;
  [Routes.Dashboard]: NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
  [Routes.Home]: undefined;
  [Routes.Profile]: undefined;
};

export type RootStackScreensProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>;

export type TabScreensProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    NativeStackScreenProps<RootStackParamsList>
  >;
