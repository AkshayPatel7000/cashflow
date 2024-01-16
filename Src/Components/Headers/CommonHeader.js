import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';
import TextCustom from '../Text/Text';
const CommonHeader = ({
  title = 'Expenses',
  goBack,
  rightIcon,
  rightIconOnPress,
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const goBackFn = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {goBack && (
          <TouchableOpacity
            onPress={goBackFn}
            style={{
              marginRight: 10,
            }}>
            <Icon name={'arrow-back'} size={25} color={colors.text} />
          </TouchableOpacity>
        )}

        <TextCustom title={title} styles={styles.titleText} />
      </View>
      {rightIcon && (
        <TouchableOpacity
          onPress={rightIconOnPress}
          style={{width: '10%', alignItems: 'center'}}>
          {rightIcon()}
        </TouchableOpacity>
      )}
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
    fontSize: 16,
  },
});
