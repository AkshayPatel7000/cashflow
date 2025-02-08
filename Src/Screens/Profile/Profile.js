import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../Components/Container/Container';
import CommonHeader from '../../Components/Headers/CommonHeader';
import UserInfo from '../../Components/Profile/UserInfo';
import ProfileItems from '../../Components/Profile/ProfileItems';
import TextCustom from '../../Components/Text/Text';

const Profile = () => {
  return (
    <Container>
      <ScrollView>
        <CommonHeader title="Profile" />

        <UserInfo />
        <ProfileItems />
      </ScrollView>
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <TextCustom title={'Version - 0.1'} />
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
