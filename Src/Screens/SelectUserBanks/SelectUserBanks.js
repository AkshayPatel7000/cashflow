import {StackActions, useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonCustom from '../../Components/Buttons/ButtonCustom';
import Container from '../../Components/Container/Container';
import TextCustom from '../../Components/Text/Text';
import {indianBanks} from '../../Utils/constant';
import {LocalStorage} from '../../Utils/localStorage';
import CommonHeader from '../../Components/Headers/CommonHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {_onSmsListenerPressed} from '../../Utils/Helper';
const SelectUserBanks = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [List, setList] = useState(indianBanks);
  const [SelectedList, setSelectedList] = useState([]);

  useLayoutEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      let user_bank = await LocalStorage.getUserBank();

      if (user_bank?.length > 0 && !props?.route?.params?.setting) {
        navigation.dispatch(StackActions.replace('Bottom'));
      } else {
        setSelectedList([...user_bank]);
      }
    } catch (error) {
      console.log('🚀 ~ file: SelectUserBanks.js:24 ~ init ~ error:', error);
    }
  };
  const updateList = (item, index) => {
    var data = [...SelectedList];
    const itemIndex = data?.findIndex(ele => ele.code === item.code);
    if (itemIndex >= 0) {
      data.splice(itemIndex, 1);
      setSelectedList(data);
    } else {
      data.push({...item, active: true});
      console.log(data);
      setSelectedList(data);
    }
  };

  const onContinue = () => {
    LocalStorage.storeUserBank(SelectedList);

    if (props?.route?.params?.setting) {
      _onSmsListenerPressed();
    }
    navigation.navigate('Bottom');
  };

  const clearPress = () => {
    setSelectedList([]);
  };

  const debounce = func => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 700);
    };
  };

  const handleChange = value => {
    if (value.trim() === '') {
      setList(indianBanks);
      return true;
    }
    let tempdata = indianBanks;
    tempdata = tempdata.filter(
      ele =>
        ele.code?.toLowerCase().includes(value?.toLowerCase()) ||
        ele.name?.toLowerCase().includes(value?.toLowerCase()),
    );
    setList(tempdata);
    console.log(value, 'value');
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  const renderItem = ({item, index}) => {
    const Selected = SelectedList?.find(ele => ele.code === item.code);

    return (
      <TouchableOpacity
        key={item.name}
        onPress={() => updateList(item, index)}
        style={{
          borderColor: !Selected?.active
            ? colors.my_tertiary
            : colors.my_addOne,
          borderWidth: 1,
          marginLeft: 5,
          marginVertical: 10,
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 50,
          backgroundColor: '#efefef45',
        }}>
        <TextCustom title={item.name} styles={{fontSize: 12, marginTop: 2}} />
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <CommonHeader
        title="Select All Your Banks"
        goBack={props?.route?.params?.setting}
        rightIcon={() => {
          return (
            SelectedList?.length > 0 && (
              <Icon name={'delete-empty-outline'} size={30} color={'#f66'} />
            )
          );
        }}
        rightIconOnPress={clearPress}
      />
      <View
        style={{
          borderColor: colors.my_tertiary,
          borderWidth: 1,
          width: '95%',
          alignSelf: 'center',
          marginVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 50,
          backgroundColor: '#efefef45',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TextInput
          onChangeText={e => optimizedFn(e)}
          placeholder="Search Bank...."
          placeholderTextColor={colors.text}
          style={{
            width: '85%',
            backgroundColor: '#efefef45',
          }}
        />
        <View>
          <Ionicons name={'search'} size={25} color={colors.text} />
        </View>
      </View>
      {List && (
        <FlatList
          extraData={List}
          data={List}
          keyExtractor={item => item.name}
          renderItem={renderItem}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 5,
          }}
        />
      )}

      <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <ButtonCustom
          title={'Save '}
          onPress={onContinue}
          disabled={SelectedList.length == 0}
        />
      </View>
    </Container>
  );
};

export default SelectUserBanks;

const styles = StyleSheet.create({});
