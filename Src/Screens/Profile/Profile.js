import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../Components/Container/Container';
import CommonHeader from '../../Components/Headers/CommonHeader';
import UserInfo from '../../Components/Profile/UserInfo';
import ProfileItems from '../../Components/Profile/ProfileItems';
import TextCustom from '../../Components/Text/Text';
import DeviceInfo from 'react-native-device-info';

const Profile = () => {
  const currentVersion = DeviceInfo.getVersion();
  return (
    <Container>
      <ScrollView>
        <CommonHeader title="Profile" />

        <UserInfo />
        <ProfileItems />
      </ScrollView>
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <TextCustom title={`Version - ${currentVersion}`} />
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
