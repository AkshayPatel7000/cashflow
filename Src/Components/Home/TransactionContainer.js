import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TextCustom from '../Text/Text';
import TransactionCardList from './TransactionCardList';
import {mainStore} from '../../Store/MainStore';
import {observer} from 'mobx-react';
const TransactionContainer = () => {
  const styles = getStyles();
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.headingContainer}>
        <TextCustom title={'Recent Transections'} styles={styles.mainHeading} />
        <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
          <TextCustom title={'View All'} styles={styles.mainSubHeading} />
        </TouchableOpacity>
      </View>
      <TransactionCardList data={mainStore?.resentTrans} isRecent={true} />
    </View>
  );
};

export default observer(TransactionContainer);
const getStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    main: {
      marginVertical: 15,
    },
    headingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    mainHeading: {
      fontSize: 16,
      fontWeight: '600',
    },
    mainSubHeading: {
      fontSize: 12,
      fontWeight: '800',
      // color: colors.my_addOne,
    },
  });
};
