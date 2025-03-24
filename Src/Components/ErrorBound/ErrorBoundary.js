import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';

// import AsyncStorage from "@react-native-community/async-storage";
import RNRestart from 'react-native-restart';
import FontAwesome from 'react-native-vector-icons/Ionicons';
import {moderateScale, scale} from '../../Utils/responsive';
import {sendWhatsAppMessage} from '../../Utils/Helper';
// some stylesheet
// import { styles } from './styles'
// some button component

export class ErrorBoundary extends React.Component {
  state = {
    error: false,
    errorString: '',
  };

  static getDerivedStateFromError(error) {
    return {error: true};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({errorString: error});
    // deal with errorInfo if needed
  }

  destroyAuthToken = async () => {
    // await AsyncStorage.removeItem('user_settings');
  };

  handleBackToSignIn = async () => {
    // remove user settings
    // await this.destroyAuthToken();
    // restart app
    RNRestart.Restart();
  };
  handleReport = async () => {
    sendWhatsAppMessage(this.state?.errorString?.toString());
  };

  render() {
    if (this.state.error) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            padding: moderateScale(20),
            backgroundColor: '#fff',
            padding: scale(20),
          }}>
          <View>
            <View>
              <Text style={{width: '100%'}}>
                <FontAwesome
                  name="ios-information-circle-outline"
                  size={60}
                  color={'black'}
                />
              </Text>
              <Text style={{fontSize: 32, color: 'black'}}>
                Oops, Something Went Wrong
              </Text>
              <Text
                style={{
                  marginVertical: 10,
                  lineHeight: 23,
                  fontWeight: '500',
                  color: 'black',
                }}>
                The app ran into a problem and could not continue. We apologise
                for any inconvenience this has caused! Press the button below to
                restart the app and sign back in. Please contact the developer
                and share the current page screen shot on whatsapp no 8435492115
                if this issue persists.
              </Text>
              <Text
                style={{
                  marginVertical: 10,
                  lineHeight: 23,
                  fontWeight: '500',
                  color: 'black',
                }}>
                {this?.state?.errorString?.toString()}
              </Text>
              <View
                style={{
                  height: 100,
                  justifyContent: 'space-between',
                }}>
                <Button
                  title={'Try again'}
                  onPress={() => this.handleBackToSignIn()}
                />
                <Button
                  title={'Report Error'}
                  onPress={() => this.handleReport()}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
