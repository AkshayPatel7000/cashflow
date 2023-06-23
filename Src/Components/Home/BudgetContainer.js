import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Shadow} from '../../Utils/constant';
import TextCustom from '../Text/Text';

const BudgetContainer = () => {
  const styles = getStyles();
  return (
    <View style={[styles.main, Shadow]}>
      <View>
        <TextCustom title={'Budget for this month'} styles={styles.mainHead} />
        <TextCustom title={'Cash Available'} styles={styles.mainSubHead} />
      </View>
      <View>
        <TextCustom title={'₹ 2,478'} styles={styles.mainAmountText} />
      </View>
    </View>
  );
};

export default BudgetContainer;

const getStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    main: {
      //   height: '20%',
      //   borderWidth: 1,
      backgroundColor: colors.my_tertiary,
      borderRadius: 15,
      marginVertical: 15,
      padding: 22,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    mainHead: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.my_white,
    },
    mainSubHead: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.my_white,
    },
    mainAmountText: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.my_white,
    },
  });
};
