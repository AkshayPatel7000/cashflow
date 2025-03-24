import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {sendOtp} from '../../Services/TrueService';
import Container from '../../Components/Container/Container';
import {useNavigation, useTheme} from '@react-navigation/native';
import TextCustom from '../../Components/Text/Text';
import Octicons from 'react-native-vector-icons/Octicons';
import {OnBoarding} from '../../Assets/SVG';
import {scale} from '../../Utils/responsive';
import ButtonCustom from '../../Components/Buttons/ButtonCustom';
const {width} = Dimensions.get('screen');
const CallerDetails = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  return (
    <Container
      contentContainerStyle={{justifyContent: 'space-between', padding: 20}}>
      <View style={styles.headersContainer}>
        <TextCustom styles={styles.headingtext} title={'Finder'} />
      </View>
      <View style={{width: '100%', height: width}}>
        <OnBoarding />
      </View>
      <View style={styles.infoContainer}>
        <TextCustom
          title={"Let's find who's calling!"}
          styles={styles.infoText}
        />
        <TextCustom
          title={'Sign up and find who is call you \nby there mobile number'}
          styles={styles.infoSubText}
        />
      </View>
      <ButtonCustom
        title={'Get Started'}
        onPress={() => navigation.navigate('SignUp')}
      />
    </Container>
  );
};

export default CallerDetails;

const getStyles = colors => {
  return StyleSheet.create({
    headersContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    headingtext: {fontSize: 24, fontWeight: '400'},
    infoText: {fontSize: 24, fontWeight: '400', color: colors.my_addOne},
    infoSubText: {
      fontSize: 16,
      fontWeight: '300',
      color: colors.my_heading,
      textAlign: 'center',
    },
    infoContainer: {alignItems: 'center', justifyContent: 'space-between'},
  });
};
