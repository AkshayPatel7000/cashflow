import firestore from '@react-native-firebase/firestore';
import {observer} from 'mobx-react';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import ErrorBoundary from './Src/Components/ErrorBound/ErrorBoundary';
import Loading from './Src/Components/Loading';
import Spinner from './Src/Components/Spinner';
import Routes from './Src/Navigation/Routes';
import {mainStore} from './Src/Store/MainStore';
import RNErrorHandler from './Src/Components/ErrorBound/ErrorHandler';
import {indianBanks} from './Src/Utils/constant';

const App = () => {
  if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  const [loading, setloading] = useState(true);
  useLayoutEffect(() => {
    // check_PERMISSIONS_STATUS(PERMISSIONS.ANDROID.READ_SMS);

    RNErrorHandler.getInstance().init();
    firestore()
      .collection('cashFlow')
      .get()
      .then(res => {
        let finalData = {};
        res.docs.map(ele => {
          var key = Object?.keys(ele.data())[0];
          finalData[key] = ele?.data()[key];
          return ele?.data();
        });

        mainStore?.setFirebaseData(finalData);
      })
      .catch(err => {
        console.log('error', err);
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
    // <ErrorBoundary>
    <GestureHandlerRootView style={{flex: 1}}>
      <Routes />
      {mainStore.loading && <Spinner />}
    </GestureHandlerRootView>
    // </ErrorBoundary>
  );
};

export default observer(App);

const styles = StyleSheet.create({});
