import React from 'react';
import BottomTabs from '../BottomTabs/BottomTabs';
import {
  TransactionsDetail,
  SelectUserBanks,
  PrivacyPolicy,
  CallerDetails,
  SignUp,
  Otp,
  SearchContact,
} from '../../Screens';
const AppStack = Stack => {
  return (
    <>
      <Stack.Screen name="SelectUserBanks" component={SelectUserBanks} />
      <Stack.Screen name="Bottom" component={BottomTabs} />
      <Stack.Screen name="TransactionsDetail" component={TransactionsDetail} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="CallerDetails" component={CallerDetails} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OTP" component={Otp} />
      <Stack.Screen name="SearchContact" component={SearchContact} />
    </>
  );
};
export default AppStack;
