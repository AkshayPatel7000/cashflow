import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
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
          backgroundColor: disabled ? 'gray' : colors.my_Black,
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
