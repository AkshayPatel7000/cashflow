import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Shadow, indianBankLogo} from '../../Utils/constant';
import * as SVG from '../../Assets/SVG';
import TextCustom from '../Text/Text';
import {mainStore} from '../../Store/MainStore';
import {observer} from 'mobx-react';
import moment from 'moment';
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
