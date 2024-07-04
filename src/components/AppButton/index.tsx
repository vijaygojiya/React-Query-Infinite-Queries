import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import {useTheme} from '@react-navigation/native';

//
interface AppButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const AppButton: FC<AppButtonProps> = ({
  title = '',
  isLoading = false,
  disabled,

  containerStyle = {},
  titleStyle = {},

  ...rest
}) => {
  const {colors} = useTheme();

  return (
    <Pressable
      disabled={disabled || isLoading}
      {...rest}
      style={[styles.container, containerStyle]}>
      {isLoading ? (
        <ActivityIndicator size={23} color={colors.text} />
      ) : (
        <Text style={[styles.title, {color: colors.text}, titleStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default AppButton;
