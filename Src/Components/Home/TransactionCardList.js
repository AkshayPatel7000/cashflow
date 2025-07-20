import {useNavigation, useTheme} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {mainStore} from '../../Store/MainStore';
import TextCustom from '../Text/Text';
import TransactionCard from './TransactionCard';
const TransactionCardList = ({data, isRecent = false}) => {
  const styles = getStyles();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const move = item => {
    mainStore.setTransactionDetail({...item});
    navigation.navigate('TransactionsDetail');
  };

  return (
    <>
      {data.length > 0 ? (
        <FlatList
          data={data}
          initialNumToRender={50}
          renderItem={({item}) => (
            <TransactionCard item={item} move={move} isRecent={isRecent} />
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <TextCustom
            title={'No Transaction Found'}
            styles={{paddingVertical: 30}}
          />
        </View>
      )}
    </>
  );
};

export default observer(TransactionCardList);
const getStyles = () => {
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
      fontWeight: '400',
    },
    transactionCard: {
      borderRadius: 15,
      padding: 10,
      marginVertical: 6,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',

      //   justifyContent: 'space-evenly',
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 20,
    },
  });
};
