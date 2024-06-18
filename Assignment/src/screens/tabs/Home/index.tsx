import {Text, View} from 'react-native';
import React from 'react';
import {TabScreensProps} from '../../../types/navigation';

const Home = ({}: TabScreensProps<'Home'>) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
