import React, {useEffect} from 'react';
import analytics from '@react-native-firebase/analytics';
import {useNavigationContainerRef} from '@react-navigation/native';
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
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const routeNameRef = React.createRef();

    const onStateChange = async () => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.getCurrentRoute()?.name;

      if (previousRouteName !== currentRouteName) {
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
      }
      routeNameRef.current = currentRouteName;
    };

    navigationRef.addListener('state', onStateChange);

    return () => navigationRef.removeListener('state', onStateChange);
  }, [navigationRef]);

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
