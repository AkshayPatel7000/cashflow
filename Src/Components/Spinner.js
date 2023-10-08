import Lottie from 'lottie-react-native';
import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Spinner = () => {
  const styles = GetStyles();

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 160,
          height: 160,
          backgroundColor: '#fff',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Lottie
          source={require('../Assets/JSON/wait.json')}
          autoPlay
          useNativeLooping
          speed={1}
          style={{width: 160, height: 160}}
          loop
        />
      </View>
    </View>
  );
};

export default observer(Spinner);

const GetStyles = () => {
  return (styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(85, 94, 105, 0.7)',
      position: 'absolute',
      zIndex: 999,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));
};
