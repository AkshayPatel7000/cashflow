import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TextCustom from '../Text/Text';
import {indianBankLogo} from '../../Utils/constant';
import {useTheme} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {mainStore} from '../../Store/MainStore';
import ButtonCustom from '../Buttons/ButtonCustom';

const Filter = ({close}) => {
  const styles = getStyles();
  const {colors} = useTheme();
  const [Bank, setBank] = useState(mainStore.fSelectedBank.Bank);
  const [type, setType] = useState(mainStore.fSelectedBank.type);
  const onApply = () => {
    mainStore.setFilterByBank({Bank, type});
    close();
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => setBank(item)}
        style={[
          styles.pill,
          {
            // borderWidth: Bank?.code === item?.code ? 1 : 0,
            borderColor:
              Bank?.code === item?.code ? colors.my_addOne : colors.my_tertiary,
          },
        ]}>
        <View style={{width: 30, height: 30}}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={indianBankLogo[item?.code]}
          />
        </View>
        {/* <TextCustom
          title={item?.code}
          styles={{
            textAlign: 'center',
            fontSize: 16,
            marginTop: 3,
          }}
        /> */}
      </TouchableOpacity>
    );
  };
  const onClear = () => {
    setBank({});
    setType({});
    mainStore.clearFilter();
  };
  return (
    <View style={{marginBottom: 20}}>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={onClear}
          style={{
            padding: 10,
            alignItems: 'center',
            width: '30%',
          }}>
          <TextCustom
            title={'Clear All'}
            styles={{
              fontSize: 16,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 10}}>
        <View style={{marginHorizontal: 20, marginBottom: 10}}>
          <TextCustom
            title={'Filter by bank'}
            styles={{
              fontSize: 20,
            }}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={mainStore?.userAllBanks}
          renderItem={renderItem}
        />

        <View style={{marginVertical: 30}}>
          <View style={{marginHorizontal: 20, marginBottom: 10}}>
            <TextCustom
              title={'Filter by type'}
              styles={{
                fontSize: 20,
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setType({isCredit: 'credit'})}
              style={[
                styles.pill,
                {
                  // borderWidth: type?.isCredit === 'credit' ? 1 : 0,

                  borderColor:
                    type?.isCredit === 'credit'
                      ? colors.my_addOne
                      : colors.my_tertiary,
                },
              ]}>
              <TextCustom
                title={'Credit'}
                styles={{
                  textAlign: 'center',
                  fontSize: 16,
                  marginTop: 3,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setType({isCredit: 'debit'})}
              style={[
                styles.pill,
                {
                  // borderWidth: type?.isCredit === 'debit' ? 1 : 0,

                  borderColor:
                    type?.isCredit === 'debit'
                      ? colors.my_addOne
                      : colors.my_tertiary,
                },
              ]}>
              <TextCustom
                title={'Debit'}
                styles={{
                  textAlign: 'center',
                  fontSize: 16,
                  marginTop: 3,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignSelf: 'flex-end',
        }}>
        <ButtonCustom
          title={'Apply'}
          extraStyles={{width: '45%'}}
          onPress={onApply}
        />
        <ButtonCustom
          onPress={close}
          title={'Cancel'}
          extraStyles={{
            width: '45%',
            backgroundColor: colors.my_white,
            borderColor: colors.my_Black,
            borderWidth: 1,
          }}
          textStyles={{
            color: colors.my_Black,
          }}
        />
      </View>
    </View>
  );
};

export default observer(Filter);

const getStyles = () =>
  StyleSheet.create({
    pill: {
      padding: 10,
      borderRadius: 40,
      marginHorizontal: 8,
      width: 100,
      alignContent: 'center',
      borderWidth: 1,
      // justifyContent: 'space-evenly',
      alignItems: 'center',
      // flexDirection: 'row',
    },
  });
