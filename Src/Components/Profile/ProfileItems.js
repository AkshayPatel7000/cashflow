import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import TextCustom from '../Text/Text';
import {useNavigation, useTheme} from '@react-navigation/native';
import {LocalStorage} from '../../Utils/localStorage';
const ProfileItems = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const moveTo = name => {
    navigation.navigate(name, {setting: true});
  };
  return (
    <View style={styles.main}>
      <View style={{paddingHorizontal: 10}}>
        <TouchableOpacity
          style={styles.single}
          onPress={() => moveTo('SelectUserBanks')}>
          <View style={styles.IconText}>
            <View style={styles.icon}>
              <Icon name={'bank'} size={20} color={colors.my_subHeading} />
            </View>
            <TextCustom title={'Edit Banks'} />
          </View>

          <Octicons
            name={'chevron-right'}
            size={20}
            color={colors.my_subHeading}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.single}
          onPress={() => moveTo('PrivacyPolicy')}>
          <View style={styles.IconText}>
            <View style={styles.icon}>
              <Octicons name={'info'} size={20} color={colors.my_subHeading} />
            </View>
            <TextCustom title={'Privacy Policy'} />
          </View>

          <Octicons
            name={'chevron-right'}
            size={20}
            color={colors.my_subHeading}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.single}
          onPress={async () => {
            const data = await LocalStorage.getLoginData();
            if (data?.installationId) {
              moveTo('SearchContact');
            } else {
              moveTo('CallerDetails');
            }
          }}>
          <View style={styles.IconText}>
            <View style={styles.icon}>
              <Octicons
                name={'telescope-fill'}
                size={20}
                color={colors.my_subHeading}
              />
            </View>
            <TextCustom title={'Caller Info'} />
          </View>

          <Octicons
            name={'chevron-right'}
            size={20}
            color={colors.my_subHeading}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ProfileItems;

const getStyles = colors => {
  return StyleSheet.create({
    main: {
      marginHorizontal: 15,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: 'rgba(145, 143, 145, 0.2)',
      borderBottomColor: 'rgba(145, 143, 145, 0.2)',
      paddingVertical: 20,
    },
    single: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 15,
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      backgroundColor: colors.my_primary,
      marginVertical: 5,
      borderRadius: 8,
    },
    IconText: {
      flexDirection: 'row',
      //   justifyContent: 'space-around',
      width: '50%',
      alignItems: 'center',
    },
    icon: {
      backgroundColor: colors.my_tertiary,
      padding: 10,
      borderRadius: 8,
      marginRight: 20,
    },
  });
};
