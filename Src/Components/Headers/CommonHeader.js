import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import TextCustom from '../Text/Text';
const CommonHeader = ({title = 'Expenses', goBack = false}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {goBack && (
          <TouchableOpacity
            style={{
              marginRight: 10,
            }}>
            <Icon name={'arrow-back'} size={25} color={colors.text} />
          </TouchableOpacity>
        )}

        <TextCustom title={title} styles={styles.titleText} />
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  titleText: {
    fontWeight: '700',
    fontSize: 18,
  },
});
