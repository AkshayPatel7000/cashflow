import {observer} from 'mobx-react';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Loading from './Src/Components/Loading';
import Routes from './Src/Navigation/Routes';
const App = () => {
  if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  const [loading, setloading] = useState(true);
  useLayoutEffect(() => {
    // check_PERMISSIONS_STATUS(PERMISSIONS.ANDROID.READ_SMS);

    var interval = setTimeout(() => {
      setloading(false);
      // _onSmsListenerPressed();
    }, 5000);

    return () => clearTimeout(interval);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Routes />
    </GestureHandlerRootView>
  );
};

export default observer(App);

const styles = StyleSheet.create({});
