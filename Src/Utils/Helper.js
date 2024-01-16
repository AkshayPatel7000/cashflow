import {RESULTS, check, request} from 'react-native-permissions';

import SmsAndroid from 'react-native-get-sms-android';
import {mainStore} from '../Store/MainStore';
import moment from 'moment';
import {Alert, Linking} from 'react-native';
import {LocalStorage} from './localStorage';
import {Months} from './constant';
import {phones_list} from './phoneList';
import {showMessage} from 'react-native-flash-message';

export const showError = (message, duration = 1000) => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
    duration,
  });
};

export const showSuccess = message => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
  });
};

export const check_PERMISSIONS_STATUS = async permission => {
  try {
    check(permission).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          request_PERMISSIONS(permission);
          break;
        case RESULTS.LIMITED:
          request_PERMISSIONS(permission);
          _onSmsListenerPressed(permission);

          break;
        case RESULTS.GRANTED:
          _onSmsListenerPressed(permission);

          break;
        case RESULTS.BLOCKED:
          Linking.openSettings();
          break;
      }
    });
  } catch (err) {
    console.warn(err);
  }
};

export const request_PERMISSIONS = async permission => {
  try {
    const result = await request(permission);
    console.log('result--->', result);
    if (result === 'granted') {
      _onSmsListenerPressed(permission);
    }

    return result;
  } catch (err) {
    console.warn(err);
  }
};

export async function _onSmsListenerPressed(
  permission = 'android.permission.READ_SMS',
) {
  try {
    const status = await check(permission);

    if (status === 'granted') {
      SmsAndroid.list(
        JSON.stringify({box: 'inbox'}),
        fail => {
          console.log('Failed with this error: ' + fail);
        },
        (count, smsList) => {
          mainStore.setSms(JSON.parse(smsList));
        },
      );
    }
  } catch (err) {
    console.log('errr', err);
  }
}

export function extractAmountFromSMS(smsText) {
  const regex = /inr\s*([\d,]+)/; // Assuming the amount is in INR currency
  const regexINRDOT = /inr.\s*([\d,]+)/; // Assuming the amount is in INR currency
  const regexRS = /rs\s*([\d,]+)/; // Assuming the amount is in INR currency
  const regexRSDot = /rs.\s*([\d,]+)/; // Assuming the amount is in INR currency
  const regexDBy = /debitedby\s*([\d,]+)/; // Assuming the amount is in INR currency

  const match = smsText?.match(regex);
  const matchINRDOT = smsText?.match(regexINRDOT);
  const matchRS = smsText?.match(regexRS);
  const matchRSDot = smsText?.match(regexRSDot);
  const matchDby = smsText?.match(regexDBy);

  if (match && match[1]) {
    const amountString = match[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
  if (matchINRDOT && matchINRDOT[1]) {
    const amountString = matchINRDOT[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
  if (matchRS && matchRS[1]) {
    const amountString = matchRS[1].replace(/,/g, ''); // Remove any commas in the amount string

    return amountString;
  }
  if (matchRSDot && matchRSDot[1]) {
    const amountString = matchRSDot[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
  if (matchDby && matchDby[1]) {
    const amountString = matchDby[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
}
export const AccountNumber = smsText => {
  const reqAC = /ac\s*([\d,]+)/;
  const reqACDot = /ac.\s*([\d,]+)/;
  const reqACxx = /acxx\s*([\d,]+)/;
  const reqACDotxx = /ac.xx\s*([\d,]+)/;
  const reqxxxx = /xxxx\s*([\d,]+)/;
  const reqacnoxx = /acnoxx\s*([\d,]+)/;
  const reqacendingwith = /acendingwith\s*([\d,]+)/;
  const matchAC = smsText?.match(reqAC);
  const matchACDot = smsText?.match(reqACDot);
  const matchACXX = smsText?.match(reqACxx);
  const matchACDotXX = smsText?.match(reqACDotxx);
  const matchXXXX = smsText?.match(reqxxxx);
  const matchACNO = smsText?.match(reqacnoxx);
  const matchACEW = smsText?.match(reqacendingwith);
  if (matchAC && matchAC[1]) {
    const amountString = matchAC[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
  if (matchACDot && matchACDot[1]) {
    const amountString = matchACDot[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
  if (matchACXX && matchACXX[1]) {
    const amountString = matchACXX[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
  if (matchACDotXX && matchACDotXX[1]) {
    const amountString = matchACDotXX[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
  if (matchXXXX && matchXXXX[1]) {
    const amountString = matchXXXX[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
  if (matchACNO && matchACNO[1]) {
    const amountString = matchACNO[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
  if (matchACEW && matchACEW[1]) {
    const amountString = matchACEW[1].replace(/,/g, ''); // Remove any commas in the amount string
    return amountString;
  }
};
export const IsCreditCard = smsText => {
  const reqCARD = /card\s*([\d,]+)/;
  const reqCARDXX = /cardxx\s*([\d,]+)/;
  const matchCARD = smsText?.match(reqCARD);
  const matchCARDXX = smsText?.match(reqCARDXX);
  if (matchCARD && matchCARD[1]) {
    const CARDNOString = matchCARD[1].replace(/,/g, ''); // Remove any commas in the amount string
    return CARDNOString;
  }
  if (matchCARDXX && matchCARDXX[1]) {
    const CARDNOString = matchCARDXX[1].replace(/,/g, ''); // Remove any commas in the amount string
    return CARDNOString;
  }
};
export const hasUPIid = smsText => {
  // console.log('🚀 ~ file: Helper.js:146 ~ hasUPIid ~ smsText:', smsText);
  const reqUPI = /[\w.-]+@[\w.-]+/;

  const matchUPI = smsText?.match(reqUPI);

  if (matchUPI && matchUPI[0]) {
    const UPI_STRING = matchUPI[0].replace(/,/g, ''); // Remove any commas in the amount string
    return UPI_STRING;
  }
};
export const filterSMS = async list => {
  try {
    const indianBanks = await LocalStorage?.getUserBank();

    const arrayGain = mainStore?.firebaseData?.credits;
    const arrayLoss = mainStore?.firebaseData?.debits;

    var otherList = [];
    var doubleList = [];

    list?.map(ele => {
      var msgAddress = ele?.address;
      // === '+917000423629' ? 'union' : ele?.address;
      var code = '';
      if (
        ele?.body?.includes('credited') &&
        ele?.body?.includes('debited') &&
        indianBanks.some(word => {
          var d = new RegExp(word.code);
          if (d.test(msgAddress)) {
            code = word;
          }
          return d.test(msgAddress);
        })
      ) {
        doubleList.push({...ele, ...code});
      } else {
        var code = '';
        if (
          indianBanks.some(word => {
            var d = new RegExp(word.code);
            if (d.test(msgAddress)) {
              code = word;
            }
            return d.test(msgAddress);
          })
        )
          otherList.push({...ele, ...code});
      }
    });

    var finalGain = otherList?.map(ele => {
      var msgAddress = ele?.address?.toLowerCase();
      if (
        arrayGain.some(word =>
          ele?.body?.toLowerCase()?.includes(word?.toLowerCase()),
        )
      ) {
        // if (!neglectKeys.some(word => msgAddress?.includes(word?.toLowerCase())))
        return {...ele, isCredited: true};
      }
    });
    var finalDoubleLoss = doubleList?.map(ele => {
      var msgAddress = ele?.address?.toLowerCase();
      if (
        arrayLoss.some(word =>
          ele?.body?.toLowerCase()?.includes(word?.toLowerCase()),
        )
      ) {
        // if (!neglectKeys.some(word => msgAddress?.includes(word?.toLowerCase())))
        return {...ele, isCredited: false};
      }
    });

    var finalLoss = otherList?.map(ele => {
      if (
        arrayLoss.some(word =>
          ele?.body?.toLowerCase()?.includes(word?.toLowerCase()),
        )
      ) {
        return {...ele, isCredited: false};
      }
    });

    var credited = finalGain?.filter(ele => ele);
    console.log(
      '🛺 ~ file: Helper.js:253 ~ filterSMS ~ credited:',
      credited[0],
    );
    var debited = finalLoss?.filter(ele => ele);
    var doubleDebited = finalDoubleLoss?.filter(ele => ele);

    var newData = [...credited, ...debited, ...doubleDebited]?.sort(function (
      x,
      y,
    ) {
      return y?.time - x?.time;
    });

    return new Promise.resolve(newData);
  } catch (error) {
    console.log('🚀 ~ file: Helper.js:253 ~ filterSMS ~ error:', error);

    Promise.reject([]);
    return [];
  }
};
export const uniqueArray = (data, key) => {
  return [...new Map(data.map(item => [item[key], item])).values()];
};

export const filterByDays = (list = [], days = 10) => {
  const dateStrings = list;

  // Get the current date
  const currentDate = new Date();

  // Calculate the date 10 days ago
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(currentDate.getDate() - days);

  // Filter dates that are within the last 10 days
  const lastTenDaysData = dateStrings?.filter(
    date => date?.time >= tenDaysAgo && date?.time <= currentDate,
  );

  return lastTenDaysData;
};
export const filterByMonth = (list = []) => {
  const dateStrings = list;
  const MonthsArray = Months;
  var filterMonths = MonthsArray.map(ele => {
    var dataList = dateStrings.filter(item => {
      return moment(item.time).format('MMM YY') === `${ele.shortName} 23`;
    });

    return {
      month: ele.name,
      dataList: dataList,
    };
  });
  var filterMonthsNoDate = filterMonths.filter(ele => ele.dataList.length > 0);

  return filterMonthsNoDate;
};

export const getTodaysTransactions = (list = [], date = new Date()) => {
  const dateStrings = list;

  // Get the current date
  const currentDate = date;

  // Filter dates that are within the last 10 days
  const lastTenDaysData = dateStrings?.filter(
    date => moment(date?.time).format('ll') == moment(currentDate).format('ll'),
  );

  return lastTenDaysData;
};
export const sumSameDayTrans = (list = []) => {
  const transactions = list;

  const summedTransactions = {
    credit: {},
    debit: {},
  };

  transactions.forEach(transaction => {
    const {time, amount, isCredited} = transaction;

    var formateTime = moment(time).format('DD MMM');

    if (isCredited) {
      if (summedTransactions.credit[formateTime]) {
        summedTransactions.credit[formateTime] = {
          ...transaction,
          amount:
            Number(summedTransactions.credit[formateTime].amount) +
            Number(amount),
        };
      } else {
        summedTransactions.credit[formateTime] = {
          ...transaction,
          amount: Number(amount),
        };
      }
    } else {
      if (summedTransactions.debit[formateTime]) {
        summedTransactions.debit[formateTime] = {
          ...transaction,
          amount:
            Number(summedTransactions.debit[formateTime].amount) +
            Number(amount),
        };
      } else {
        summedTransactions.debit[formateTime] = {
          ...transaction,
          amount: Number(amount),
        };
      }
    }
  });

  return summedTransactions;
};

export const getCommonBanks = () => {
  let banks = [];
  var data = uniqueArray(mainStore?.sms, 'code');
  banks = data.map(item => {
    return {
      code: item.code,
    };
  });
  console.log('🚀 ~ file: Helper.js:326 ~ getCommonBanks ~ banks:', banks);
  mainStore.setUserAllBanks(banks);
};

export const sendWhatsAppMessage = err => {
  let link = 'whatsapp://send?text=' + err + '&phone=' + '+918435492115';

  if (link) {
    Linking.openURL(link)
      .then(supported => {
        console.log(
          '🛺 ~ file: Helper.js:390 ~ sendWhatsAppMessage ~ supported:',
          supported,
        );
        if (!supported) {
          Alert.alert(
            'Please install whatsapp to send direct message to Developer via whats app',
          );
        } else {
          return Linking.openURL(link);
        }
      })
      .catch(err => {
        Alert.alert(
          'Please install whatsapp to send direct message to Developer via whats app',
        );
      });
  } else {
    Alert.alert(
      'Please install whatsapp to send direct message to Developer via whats app',
    );
    console.log('sendWhatsAppMessage -----> ', 'message link is undefined');
  }
};

export const getRandomDevice = () => {
  var randomnumber =
    Math.floor(Math.random() * (phones_list.length - 0 + 1)) + 0;
  return phones_list[randomnumber];
};

export const randomId = (length = 16) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
