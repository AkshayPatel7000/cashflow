import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import ButtonCustom from '../../Components/Buttons/ButtonCustom';
import Container from '../../Components/Container/Container';
import TextCustom from '../../Components/Text/Text';
import {showError} from '../../Utils/Helper';
import {sendOtp} from '../../Services/TrueService';

const SignUp = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();
  const validateMobileNumber = () => {
    const pattern = /^[6-9]\d{9}$/;
    console.log(pattern.test(mobile), mobile);
    if (pattern.test(mobile)) {
      return true;
    }
    showError('Please enter valid mobile number.');
  };

  const onSubmit = async () => {
    if (validateMobileNumber()) {
      try {
        const data = await sendOtp(mobile);
        if (data) {
          if (data.status === 9) navigation.navigate('OTP');
          if (data.status === 1) navigation.navigate('OTP');
          if (data.status === 3) navigation.navigate('SearchContact');
        }
      } catch (error) {
        console.log('🚀 ~ onSubmit ~ error:', error);
      }
    }
  };

  return (
    <Container
      contentContainerStyle={{padding: 20, justifyContent: 'space-between'}}>
      <View>
        <View style={styles.headersContainer}>
          <TextCustom title={'Finder'} styles={styles.headingtext} />
        </View>
        <View style={{marginBottom: 30}}>
          <TextCustom
            title={'Hi! welcome to Finder'}
            styles={styles.infoSubText}
          />
          <TextCustom title={'Login to your account'} styles={styles.infoSub} />
        </View>
        <TextCustom
          title={'Enter your phone number'}
          styles={{...styles.infoSub, color: colors.my_heading}}
        />

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={[styles.inputContainer, {width: 60}]}>
            <TextCustom title={'+91'} styles={styles.code} />
          </View>
          <View style={{width: 12}}></View>
          <View style={[styles.inputContainer, {flex: 1}]}>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={setMobile}
            />
          </View>
        </View>
        <TextCustom
          styles={styles.priorityText}
          title={'Securing your personal information is our priority.'}
        />
      </View>
      <ButtonCustom title={'Next'} onPress={onSubmit} />
    </Container>
  );
};

export default SignUp;
const getStyles = colors => {
  return StyleSheet.create({
    headersContainer: {
      flexDirection: 'row',
      width: '100%',

      marginVertical: 20,
    },
    headingtext: {fontSize: 24, fontWeight: '400'},
    infoText: {fontSize: 24, fontWeight: '400', color: colors.my_addOne},
    infoSubText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.my_heading,
    },
    infoSub: {
      fontSize: 14,
      fontWeight: '600',
      color: '#B9B8BD',
    },
    infoContainer: {alignItems: 'center', justifyContent: 'space-between'},
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.my_tertiary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#f1f2f4',
    },
    code: {
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Poppins-Medium',
      // paddingHorizontal: 15,
    },
    input: {
      color: colors.my_text,
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Poppins-Medium',
      flex: 1,
      paddingHorizontal: 20,
    },
    priorityText: {
      fontSize: 12,
      fontWeight: '500',
      color: '#B9B8BD',
      marginTop: 10,
    },
  });
};
