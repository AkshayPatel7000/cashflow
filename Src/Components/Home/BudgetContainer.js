import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Shadow} from '../../Utils/constant';
import TextCustom from '../Text/Text';
import {observer} from 'mobx-react';
import {mainStore} from '../../Store/MainStore';

const BudgetContainer = () => {
  const styles = getStyles();

  return (
    <View style={[styles.main, Shadow]}>
      <View>
        <TextCustom title={'Spent of the day'} styles={styles.mainHead} />
        <TextCustom title={'Cash Debited'} styles={styles.mainSubHead} />
      </View>
      <View>
        <TextCustom
          title={`₹ ${mainStore?.todaysTotal?.debit}`}
          styles={styles.mainAmountText}
        />
      </View>
    </View>
  );
};

export default observer(BudgetContainer);

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
