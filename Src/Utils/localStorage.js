import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
  //AUTH TOKEN
  static storeUserBank = async value => {
    await AsyncStorage.setItem('BANKS', JSON.stringify(value));
  };
  static getUserBank = async value => {
    return await AsyncStorage.getItem('BANKS')
      .then(res => {
        return JSON.parse(res);
      })
      .catch(err => console.error('err'));
  };
  static storeToken = async value => {
    await AsyncStorage.setItem('token', JSON.stringify(value));
  };
  static getToken = async value => {
    return await AsyncStorage.getItem('token')
      .then(res => {
        return JSON.parse(res);
      })
      .catch(err => console.error('err'));
  };
  static storeLoginData = async value => {
    await AsyncStorage.setItem('LoginData', JSON.stringify(value));
  };
  static getLoginData = async value => {
    return await AsyncStorage.getItem('LoginData')
      .then(res => {
        return JSON.parse(res);
      })
      .catch(err => console.error('err'));
  };
}

export {LocalStorage};
