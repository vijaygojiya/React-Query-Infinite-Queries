import {Text, View} from 'react-native';
import React from 'react';
import {TabScreensProps} from '../../../types/navigation';

const Profile = ({}: TabScreensProps<'Profile'>) => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
