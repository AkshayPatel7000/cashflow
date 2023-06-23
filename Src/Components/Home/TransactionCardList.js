import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Shadow, indianBankLogo} from '../../Utils/constant';
import * as SVG from '../../Assets/SVG';
import TextCustom from '../Text/Text';
import {mainStore} from '../../Store/MainStore';
import {observer} from 'mobx-react';
import moment from 'moment';
const TransactionCardList = ({data, isRecent = false}) => {
  const styles = getStyles();
  const {colors} = useTheme();
  const renderItem = ({item}) => {
    return (
      <View style={[styles.transactionCard, Shadow]}>
        {!indianBankLogo[item?.code] ? (
          <SVG.BankSVG />
        ) : (
          <View style={{width: 55, height: 55}}>
            <Image
              source={indianBankLogo[item?.code]}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        )}
        <View style={styles.textContainer}>
          <View style={{width: '70%'}}>
            <TextCustom
              title={item?.address}
              styles={styles.mainHeading}
              numberOfLines={1}
            />
            {isRecent ? (
              <TextCustom
                title={moment(item.time).fromNow()}
                styles={styles.mainSubHeading}
              />
            ) : (
              <TextCustom
                title={moment(item.time).format('l LT')}
                styles={styles.mainSubHeading}
              />
            )}
          </View>
          <View
            style={{
              // flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '35%',
            }}>
            {item.amount ? (
              <>
                <TextCustom
                  numberOfLines={1}
                  title={`${item?.isCredited ? '+₹' : '-₹'}${item.amount}.00`}
                  styles={{
                    width: '100%',

                    ...styles.mainHeading,
                    fontSize: 16,
                    color: item?.isCredited
                      ? colors.my_tertiary
                      : colors.my_addOne,
                    textAlign: 'right',
                  }}
                />
              </>
            ) : (
              <TextCustom
                title={item?.isCredited ? '+₹ ' : '-₹ '}
                styles={{
                  ...styles.mainHeading,
                  color: item?.isCredited
                    ? colors.my_tertiary
                    : colors.my_addOne,
                }}
              />
            )}

            <TextCustom
              title={item?.code}
              styles={{
                ...styles.mainSubHeading,
                textAlign: 'right',
                width: '100%',
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      initialNumToRender={50}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
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
      fontSize: 18,
      fontWeight: '600',
    },
    mainSubHeading: {
      fontSize: 14,
      fontWeight: '400',
    },
    transactionCard: {
      borderRadius: 15,
      padding: 10,
      marginVertical: 8,
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
