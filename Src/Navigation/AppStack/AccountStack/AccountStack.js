import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  BataAllowance,
  ChangePassword,
  EditDriverLicense,
  EditProfileInfo,
  LicenceInfo,
  Profile,
  ProfileInfo,
} from "../../..";
const Stack = createStackNavigator();
const AccountStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        animationEnabled={true}
        initialRouteName="Profile"
      >
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="BataAllowance" component={BataAllowance} />
        <Stack.Screen name="LicenceInfo" component={LicenceInfo} />
        <Stack.Screen name="EditProfileInfo" component={EditProfileInfo} />
        <Stack.Screen name="EditDriverLicense" component={EditDriverLicense} />
      </Stack.Navigator>
    </>
  );
};
export default AccountStack;
