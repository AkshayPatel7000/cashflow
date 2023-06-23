import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import TextCustom from '../Text/Text';
import {Shadow} from '../../Utils/constant';

const HomeHeader = () => {
  return (
    <View style={[styles.main, Shadow]}>
      <View style={{height: 40, width: 40, borderRadius: 10}}>
        <Image
          style={{height: '100%', width: '100%', borderRadius: 10}}
          source={{
            uri: 'https://xsgames.co/randomusers/assets/avatars/male/74.jpg',
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <TextCustom title={'Welcome'} styles={styles.greeting} />
        <TextCustom title={'Akshay Patel'} />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  main: {
    height: 68,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
  },
  username: {
    fontSize: 12,
    fontWeight: '400',
  },
});
