import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../Components/Container/Container';
import Lottie from 'lottie-react-native';

const Wallet = () => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Lottie
          source={require('../../Assets/JSON/uc.json')}
          autoPlay
          loop
          style={{width: Dimensions.get('screen').width * 0.7}}
        />
      </View>
    </Container>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
