import {useTheme} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppStatusBar from '../AppStatusBar';

const Container = props => {
  const {
    contentContainerStyle = {},
    statusBarStyle = {},
    containerStyle = {},
  } = props;
  const {colors} = useTheme();
  return (
    <LinearGradient
      start={{x: 0.4, y: 0.25}}
      end={{x: 1, y: 1.0}}
      colors={[colors.my_primary, colors.my_tertiary]}
      style={[styles.container, containerStyle]}>
      <AppStatusBar backgroundColor={colors.my_primary} {...statusBarStyle} />
      <SafeAreaView
        style={[
          styles.contentContainerStyle,
          {colors: colors.my_secondary},
          contentContainerStyle,
        ]}>
        {props.children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default observer(Container);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {flex: 1},
});
