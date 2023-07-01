import React from 'react';
import BottomTabs from '../BottomTabs/BottomTabs';
import {
  TransactionsDetail,
  SelectUserBanks,
  PrivacyPolicy,
} from '../../Screens';
const AppStack = Stack => {
  return (
    <>
      <Stack.Screen name="SelectUserBanks" component={SelectUserBanks} />
      <Stack.Screen name="Bottom" component={BottomTabs} />
      <Stack.Screen name="TransactionsDetail" component={TransactionsDetail} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </>
  );
};
export default AppStack;
