import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Shadow} from '../../Utils/constant';
import TextCustom from '../Text/Text';
import {observer} from 'mobx-react';
import {mainStore} from '../../Store/MainStore';
import moment from 'moment';

const BudgetContainer = () => {
  const styles = getStyles();
  const [toggle, setToggle] = useState(true);
  let animatedValue = new Animated.Value(0);
  let currentValue = 0;

  animatedValue.addListener(({value}) => {
    currentValue = value;
  });

  const flipAnimation = () => {
    if (currentValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }).start();
    }
  };

  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['360deg', '180deg'],
  });
  const setOpacityFront = animatedValue.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  });
  const setOpacityBack = animatedValue.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
  });
  const AnimatedStyle = {
    transform: [{rotateX: setInterpolate}],
  };
  const FrontAnimatedStyle = {
    opacity: setOpacityFront,
  };
  const BackAnimatedStyle = {
    opacity: setOpacityBack,
  };

  return (
    <Animated.View style={[AnimatedStyle]}>
      <TouchableOpacity style={[Shadow, styles.main1]} onPress={flipAnimation}>
        <Animated.View style={[FrontAnimatedStyle, styles.main]}>
          <View>
            <TextCustom title={'Spent of the day'} styles={styles.mainHead} />
            <TextCustom
              title={moment(mainStore?.selectedDate).format('LL')}
              styles={styles.mainSubHead}
            />
          </View>
          <View>
            <TextCustom
              title={`₹ ${mainStore?.todaysTotal?.debit}`}
              styles={styles.mainAmountText}
            />
          </View>
        </Animated.View>
        <Animated.View style={[BackAnimatedStyle, AnimatedStyle, styles.main]}>
          <View>
            <TextCustom title={'Credit of the day'} styles={styles.mainHead} />
            <TextCustom
              title={moment(mainStore?.selectedDate).format('LL')}
              styles={styles.mainSubHead}
            />
          </View>
          <View>
            <TextCustom
              title={`₹ ${mainStore?.todaysTotal?.credit}`}
              styles={styles.mainAmountText}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default observer(BudgetContainer);

const getStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    main: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      // borderWidth: 1,
      alignSelf: 'center',
      marginVertical: 50,
    },
    main1: {
      backgroundColor: colors.my_tertiary,
      borderRadius: 15,
      marginVertical: 15,
      padding: 22,
      paddingVertical: 42,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainHead: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.my_white,
    },
    mainSubHead: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.my_white,
    },
    mainAmountText: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.my_white,
    },
  });
};
