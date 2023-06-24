import {observer} from 'mobx-react';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import Loading from './Src/Components/Loading';
import Routes from './Src/Navigation/Routes';
import {
  _onSmsListenerPressed,
  check_PERMISSIONS_STATUS,
} from './Src/Utils/Helper';
const App = () => {
  if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  const [loading, setloading] = useState(true);
  useLayoutEffect(() => {
    check_PERMISSIONS_STATUS(PERMISSIONS.ANDROID.READ_SMS);

    var interval = setTimeout(() => {
      setloading(false);
      _onSmsListenerPressed();
    }, 5000);

    return () => clearTimeout(interval);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1}}>
      <Routes />
    </View>
  );
};

export default observer(App);

const styles = StyleSheet.create({});
