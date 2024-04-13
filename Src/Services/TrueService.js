import {mainStore} from '../Store/MainStore';
import {getRandomDevice, randomId, showError} from '../Utils/Helper';
import {LocalStorage} from '../Utils/localStorage';
import Endpoints from './Endpoints';
import client from './client';

export const sendOtp = async mobile => {
  try {
    let headersList = {
      Accept: '*/*',
      clientsecret: 'lvc22mp3l1sfv6ujg83rd17btt',
      'user-agent': 'Truecaller/11.75.5 (Android;10)',
      'accept-encoding': 'gzip',
      'content-type': 'application/json; charset=UTF-8',
    };
    const device = getRandomDevice();

    const body = {
      countryCode: 'IN',
      dialingCode: 91,
      installationDetails: {
        app: {
          buildVersion: 5,
          majorVersion: 11,
          minorVersion: 7,
          store: 'GOOGLE_PLAY',
        },
        device: {
          deviceId: 'asdfghjklpoiuytrew',
          language: 'en',
          manufacturer: device['manufacturer'],
          model: device['model'],
          osName: 'Android',
          osVersion: '10',
          mobileServices: ['GMS'],
        },
        language: 'en',
      },
      phoneNumber: mobile,
      region: 'region-2',
      sequenceNo: 2,
    };
    const apiData = await fetch(Endpoints.SEND_ON_BOARDING_OTP, {
      body: JSON.stringify(body),
      method: 'Post',
      headers: headersList,
    });
    const data = await apiData.json();
    console.log('🚀 ~ sendOtp ~ data: 88', data);
    if (data.status) {
      LocalStorage.storeLoginData({...data, mobile});
      mainStore.setLoginData({...data, mobile});
      return {...data, mobile};
    } else {
      showError(data.message);
    }
  } catch (error) {
    console.log('🚀 ~ error:', error);
  }
};

export const validateOtp = async otp => {
  try {
    const requestData = await LocalStorage.getLoginData();
    console.log('🚀 ~ validateOtp ~ requestData:', requestData);
    let headersList = {
      Accept: '*/*',
      clientsecret: 'lvc22mp3l1sfv6ujg83rd17btt',
      'user-agent': 'Truecaller/11.75.5 (Android;10)',
      'accept-encoding': 'gzip',
      'content-type': 'application/json; charset=UTF-8',
    };

    const body = {
      countryCode: 'IN',
      dialingCode: 91,
      phoneNumber: requestData.mobile,
      requestId: requestData.requestId,
      token: otp,
    };
    console.log('🚀 ~ validateOtp ~ body:', body);
    const apiData = await fetch(Endpoints.VERIFY_ON_BOARDING_OTP, {
      body: JSON.stringify(body),
      method: 'Post',
      headers: headersList,
    });
    const data = await apiData.json();
    console.log('🚀 ~ sendOtp ~ data:', data);
    if (data.status == 2) {
      LocalStorage.storeLoginData({...data, mobile: requestData.mobile});
      mainStore.setLoginData({...data, mobile: requestData.mobile});
    } else if (data.status == 11) {
      showError('Invalid OTP');
    }
    else if (data.status == 7) {
      showError('Try getting new OTP');
    }
    return data;
  } catch (error) {
    console.log('🚀 ~ error:', error);
  }
};

export const searchMobile = async q => {
  try {
    const requestData = await LocalStorage.getLoginData();
    let headersList = {
      'content-type': 'application/json; charset=UTF-8',
      'accept-encoding': 'gzip',
      'user-agent': 'Truecaller/11.75.5 (Android;10)',
      Authorization: `Bearer ${requestData.installationId}`,
    };

    const apiData = await fetch(Endpoints.SEARCH(q), {
      method: 'GET',
      headers: headersList,
    });
    const data = await apiData.json();

    return data;
  } catch (error) {
    console.log('🚀 ~ search ~ error:', error);
  }
};
