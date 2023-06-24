import React from 'react';
import BottomTabs from '../BottomTabs/BottomTabs';
import {TransactionsDetail} from '../../Screens';
const AppStack = Stack => {
  return (
    <>
      <Stack.Screen name="Bottom" component={BottomTabs} />
      <Stack.Screen name="TransactionsDetail" component={TransactionsDetail} />
    </>
  );
};
export default AppStack;
