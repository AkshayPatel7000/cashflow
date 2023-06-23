import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const TextCustom = ({title, styles, ...props}) => {
  const {colors} = useTheme();
  return (
    <Text {...props} style={[{color: colors.text}, {...styles}]}>
      {title ? title : '-'}
    </Text>
  );
};

export default TextCustom;

const styles = StyleSheet.create({});
