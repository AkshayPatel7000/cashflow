import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from '../../Utils/responsive';
import TextCustom from '../Text/Text';

const UserInfo = () => {
  const [Name, setName] = useState({});
  const {colors} = useTheme();

  const styles = getStyles({colors});
  useEffect(() => {
    DeviceInfo.getManufacturer().then(res => {
      console.log(res);
      DeviceInfo.getDeviceName().then(deviceName => {
        setName({Manufacturer: res, deviceName});
      });
    });
  }, []);
  return (
    <View style={styles.contentContainerStyle}>
      <View style={styles.info}>
        <View style={styles.UserInfo}>
          <Image
            style={styles.image}
            source={require('../../Assets/images/user.jpg')}
          />
        </View>
        <View style={styles.nameContainer}>
          <TextCustom title={Name?.Manufacturer} styles={styles.menuf} />
          <TextCustom title={Name?.deviceName} styles={styles.device} />
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

const getStyles = ({colors}) => {
  return StyleSheet.create({
    contentContainerStyle: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: moderateScale(50),
    },
    UserInfo: {
      width: scale(100),
      height: scale(100),
      backgroundColor: colors.my_tertiary,
      borderRadius: scale(50),
      justifyContent: 'center',
      alignItems: 'center',
      padding: 3,
      marginBottom: moderateScale(20),
    },
    menuf: {
      fontSize: moderateScale(18),
      color: colors.my_heading,
    },
    device: {
      color: colors.my_subHeading,
      fontSize: moderateScale(16),
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: scale(50),
    },
    nameContainer: {
      paddingVertical: moderateVerticalScale(10),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    info: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
