import Lottie from 'lottie-react-native';
import React from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Loading = () => {
  return (
    <LinearGradient
      start={{x: 0.4, y: 0.25}}
      end={{x: 1, y: 1.0}}
      colors={['#F4F6F6', '#81B2CA']}
      style={[styles.container]}>
      <StatusBar backgroundColor={'#F4F6F6'} barStyle={'light-content'} />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Lottie
          source={require('../Assets/JSON/ml.json')}
          autoPlay
          loop
          style={{width: Dimensions.get('screen').width * 0.7}}
        />
      </View>
    </LinearGradient>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
