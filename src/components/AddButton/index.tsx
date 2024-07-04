import {Pressable, PressableProps, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {useTheme} from '@react-navigation/native';

interface AddButtonProps {
  size?: number;
  onPress?: PressableProps['onPress'];
}

const AddButton = ({size = 52, onPress}: AddButtonProps) => {
  const {colors} = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.primary,
        },
      ]}>
      <Text style={{color: colors.background, fontSize: 22}}>+</Text>
    </Pressable>
  );
};

export default AddButton;
