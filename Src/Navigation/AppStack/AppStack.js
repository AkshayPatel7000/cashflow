import React from 'react';
import BottomTabs from '../BottomTabs/BottomTabs';
const AppStack = Stack => {
  return (
    <>
      <Stack.Screen name="Bottom" component={BottomTabs} />
    </>
  );
};
export default AppStack;
