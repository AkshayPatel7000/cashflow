import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextCustom from '../Text/Text';
import {Shadow} from '../../Utils/constant';
import DeviceInfo from 'react-native-device-info';

const HomeHeader = () => {
  const [Name, setName] = useState('');
  useEffect(() => {
    DeviceInfo.getManufacturer().then(res => {
      DeviceInfo.getDeviceName().then(deviceName => {
        setName(res + ' ' + deviceName);
      });
    });
  }, []);

  return (
    <View style={[styles.main, Shadow]}>
      <View style={{height: 40, width: 40, borderRadius: 10}}>
        <Image
          style={{height: '100%', width: '100%', borderRadius: 10}}
          source={require('../../Assets/images/user.jpg')}
        />
      </View>
      <View style={styles.textContainer}>
        <TextCustom title={'Welcome'} styles={styles.greeting} />
        <TextCustom title={Name} />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  main: {
    height: 68,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 10,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 10,
    fontWeight: '400',
  },
});
