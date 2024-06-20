import {Switch, Text, View} from 'react-native';
import React from 'react';
import {TabScreensProps} from '../../../types/navigation';
import {AppButton} from '../../../components';
import {Auth} from '../../../services';
import useAppTheme from '../../../hooks/useAppTheme';

const Profile = ({}: TabScreensProps<'Profile'>) => {
  const {isDark, toggleTheme} = useAppTheme();
  return (
    <View>
      <Text>Dark</Text>
      <Switch value={isDark} onChange={toggleTheme} />
      <AppButton title="Logout" onPress={Auth.signOut} />
    </View>
  );
};

export default Profile;
