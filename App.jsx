import firestore from '@react-native-firebase/firestore';
import {observer} from 'mobx-react';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import DeviceInfo from 'react-native-device-info';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ErrorBoundary from './Src/Components/ErrorBound/ErrorBoundary';
import RNErrorHandler from './Src/Components/ErrorBound/ErrorHandler';
import Loading from './Src/Components/Loading';
import Spinner from './Src/Components/Spinner';
import {showUpdateAlert} from './src/components/UpdateAlert';
import Routes from './Src/Navigation/Routes';
import {mainStore} from './Src/Store/MainStore';
import {LocalStorage} from './Src/Utils/localStorage';
import {checkAppVersionFirebase} from './src/utils/versionCheck';

const App = () => {
  if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  const [loading, setloading] = useState(true);
  useLayoutEffect(() => {
    const checkForUpdates = async () => {
      const versionCheck = await checkAppVersionFirebase();

      if (
        versionCheck &&
        (versionCheck.needsUpdate || versionCheck.isForceUpdate)
      ) {
        showUpdateAlert({
          isForceUpdate: versionCheck.isForceUpdate,
          closedTestingLink: versionCheck.closedTestingLink,
        });
      }
    };
    checkForUpdates();
    // check_PERMISSIONS_STATUS(PERMISSIONS.ANDROID.READ_SMS);
    getTokenFromLocal();
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

  const getTokenFromLocal = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    mainStore.setDeviceId(deviceId);
    const token = await LocalStorage.getToken();
    if (token) {
      mainStore.setToken(token);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <GestureHandlerRootView style={{flex: 1}}>
          <Routes />

          {mainStore.loading && <Spinner />}
        </GestureHandlerRootView>
        <FlashMessage duration={5000} floating />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default observer(App);

const styles = StyleSheet.create({});
