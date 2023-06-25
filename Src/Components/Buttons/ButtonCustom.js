import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import TextCustom from '../Text/Text';

const ButtonCustom = ({
  title,
  onPress,
  disabled,
  loading,
  extraStyles,
  textStyles,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: colors.my_Black,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 12,
          borderRadius: 50,
        },
        extraStyles,
      ]}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TextCustom
          title={title}
          styles={{
            color: colors.my_white,
            marginTop: 2,
            fontSize: 16,
            ...textStyles,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({});
