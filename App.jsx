import {observer} from 'mobx-react';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Loading from './Src/Components/Loading';
import Routes from './Src/Navigation/Routes';
import {mainStore} from './Src/Store/MainStore';
const App = () => {
  if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  const [loading, setloading] = useState(true);
  useLayoutEffect(() => {
    // check_PERMISSIONS_STATUS(PERMISSIONS.ANDROID.READ_SMS);
    firestore()
      .collection('cashFlow')
      .get()
      .then(res => {
        let finalData = {};
        res.docs.map(ele => {
          var key = Object.keys(ele.data())[0];
          finalData[key] = ele.data()[key];

          return ele.data();
        });

        mainStore.setFirebaseData(finalData);
      });
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
