import {useNavigation, useTheme} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../../Components/Container/Container';
import CommonHeader from '../../Components/Headers/CommonHeader';
import TextCustom from '../../Components/Text/Text';
import {mainStore} from '../../Store/MainStore';
import {indianBankLogo} from '../../Utils/constant';

const TransactionsDetail = () => {
  const {TransactionsDetail} = mainStore;
  console.log(
    '🚀 ~ file: TransactionsDetail.js:21 ~ TransactionsDetail ~ TransactionsDetail:',
    TransactionsDetail,
  );
  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(colors);
  return (
    <Container>
      <CommonHeader title="Details" goBack />
      <ScrollView style={styles.detail}>
        <View style={[styles.main]}>
          <View style={styles.bankIcon}>
            <View style={{height: 50, width: 50, alignSelf: 'center'}}>
              <Image
                source={indianBankLogo[TransactionsDetail?.code]}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 25,
              }}>
              <TextCustom
                title={TransactionsDetail?.other?.name}
                styles={styles.bankName}
              />
            </View>
          </View>
        </View>
        <View style={styles.msgContainer}>
          <TextCustom title={'Details'} styles={styles.DetailHeading} />
          <View style={styles.BodyContainer}>
            <TextCustom
              title={
                TransactionsDetail?.type === 'CARD' ? 'Card No.' : 'Account No.'
              }
              styles={styles.Key}
            />
            <TextCustom
              title={
                TransactionsDetail?.type === 'CARD'
                  ? 'XXXX-XXXX-XXXX-' + TransactionsDetail?.isCard
                  : 'XXXX-XXXX-XXXX-' + TransactionsDetail?.title
              }
              styles={styles.value}
            />
          </View>
          <View style={styles.BodyContainer}>
            <TextCustom title={'Date & Time'} styles={styles.Key} />
            <TextCustom
              styles={styles.value}
              title={moment(TransactionsDetail?.time).format('ll, hh:mm a')}
            />
          </View>
          <View style={styles.BodyContainer}>
            <TextCustom title={'Payment Mode'} styles={styles.Key} />
            <TextCustom
              title={TransactionsDetail?.type}
              styles={styles.value}
            />
          </View>
          {TransactionsDetail?.type == 'UPI' && (
            <View style={styles.BodyContainer}>
              <TextCustom title={'Payment To'} styles={styles.Key} />
              <TextCustom
                title={TransactionsDetail?.address}
                styles={styles.value}
              />
            </View>
          )}
          <View style={styles.BodyContainer}>
            <TextCustom title={'Amount'} styles={styles.Key} />
            <TextCustom
              title={`${TransactionsDetail?.isCredited ? '+' : '-'} ₹${Number(
                TransactionsDetail?.amount,
              )?.toLocaleString('hi-IN')}`}
              styles={{
                ...styles.amount,
                color: TransactionsDetail?.isCredited
                  ? colors.my_tertiary
                  : colors.my_addOne,
              }}
            />
          </View>
        </View>
        <View style={styles.msgContainer}>
          <TextCustom
            title={TransactionsDetail?.other?.body}
            styles={styles.Body}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          borderWidth: 1,
          paddingVertical: 15,
          alignItems: 'center',
          backgroundColor: '#000',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}>
        <TextCustom
          title={'Understood'}
          styles={{color: colors.my_white, fontSize: 18}}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default TransactionsDetail;
const getStyles = colors => {
  return StyleSheet.create({
    main: {
      width: '100%',
      alignSelf: 'center',
    },
    bankIcon: {
      flex: 1,
      margin: 20,
    },
    amount: {
      fontSize: 22,
    },
    bankName: {
      fontSize: 18,
    },
    amountContainer: {
      width: '90%',
      alignItems: 'center',
      paddingVertical: 30,
      alignSelf: 'center',
      borderRadius: 15,
      backgroundColor: colors.my_primary,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: colors.my_tertiary,
    },
    detail: {
      flex: 1,
      padding: 15,
    },
    DetailHeading: {
      fontSize: 24,
      fontWeight: '600',
    },
    BodyContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      alignItems: 'center',
    },
    Key: {
      fontSize: 16,
    },
    value: {
      fontSize: 16,
      fontWeight: '700',
      width: '60%',
      textAlign: 'right',
    },
    Body: {
      fontSize: 16,
      fontWeight: '700',
    },
    msgContainer: {
      // borderWidth: 1,
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: 'rgba(249, 249, 249, 0.4)',
      borderRadius: 15,
      marginTop: 20,
    },
  });
};
