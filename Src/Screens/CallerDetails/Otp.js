import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonCustom from '../../Components/Buttons/ButtonCustom';
import Container from '../../Components/Container/Container';
import TextCustom from '../../Components/Text/Text';
import {showError} from '../../Utils/Helper';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {validateOtp} from '../../Services/TrueService';
import { mainStore } from '../../Store/MainStore';
const {width} = Dimensions.get('screen');
const Otp = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const [otp_Code, setOtp_Code] = useState('');
  console.log("mdjkdjdj",mainStore.LoginData.mobile)
  const navigation = useNavigation();
  const validateOTP = () => {
    const pattern = /^\d{6}$/;

    if (pattern.test(otp_Code)) {
      return true;
    }

    showError('Please enter valid OTP.');
    return false;
  };

  const onSubmit = async () => {
    if (validateOTP()) {
      try {
        const data = await validateOtp(otp_Code);
        if (data.status == 2) {
          navigation.navigate('SearchContact');
        }
        console.log('go');
        //
      } catch (error) {
        console.log('🚀 ~ onSubmit ~ error:', error);
      }
    }
  };

  return (
    <Container
      contentContainerStyle={{padding: 20, justifyContent: 'space-between'}}>
      <View>
        <View
          style={{
            marginVertical: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextCustom title={'Verify Phone'} styles={styles.infoSubText} />
          <View
            style={{
              //   flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextCustom
              title={'Code has been sent to'}
              styles={styles.infoSub}
            />
            <TextCustom
              title={`+91 ${mainStore.LoginData.mobile}`}
              styles={{...styles.infoSub, color: colors.my_addOne}}
            />
          </View>
        </View>
        <TextCustom
          title={'Enter OTP'}
          styles={{...styles.infoSub, color: colors.my_heading}}
        />

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            width: '100%',
          }}>
          <OTPInputView
            pinCount={6}
            style={{height: 55}}
            placeholderCharacter="-"
            placeholderTextColor={colors.placeholder}
            code={otp_Code}
            onCodeChanged={setOtp_Code}
            codeInputHighlightStyle={{
              backgroundColor: colors.my_addOne,
            }}
            codeInputFieldStyle={{
              borderColor: colors.my_addOne,
              borderRadius: 20,
              width: width / 7.09,
              color: colors.my_text,
            }}
          />
        </View>
        <View
          style={{
            marginVertical: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextCustom
            styles={styles.priorityText}
            title={"Didn't get OTP code?"}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              //   flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextCustom title={'Retry'} styles={styles.RetryText} />
          </TouchableOpacity>
        </View>
      </View>
      <ButtonCustom title={'Verify'} onPress={onSubmit} />
    </Container>
  );
};

export default Otp;
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
      fontSize: 16,
      fontWeight: '500',
      //   color: colors.my_tertiary,
      marginTop: 10,
    },
    RetryText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.my_tertiary,
      //   marginTop: 10,
    },
  });
};
