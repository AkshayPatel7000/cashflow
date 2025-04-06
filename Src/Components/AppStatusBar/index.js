import {useTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';

const AppStatusBar = props => {
  const {
    backgroundColor = '#FFF',
    statusBarHeight = StatusBar.currentHeight,
    ...statusBarProps
  } = props;
  const {dark} = useTheme();
  return (
    <View
      style={{
        //height: statusBarHeight,
        backgroundColor,
      }}>
      {/* <SafeAreaView> */}
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={!dark ? 'dark-content' : 'light-content'}
        {...statusBarProps}
      />
      {/* </SafeAreaView> */}
    </View>
  );
};

export default AppStatusBar;
