import {makeAutoObservable} from 'mobx';
import {
  AccountNumber,
  IsCreditCard,
  extractAmountFromSMS,
  filterByDays,
  filterSMS,
  hasUPIid,
  sumSameDayTrans,
} from '../Utils/Helper';

class MainStore {
  sms = [];
  resentTrans = [];
  totalAmount = 0;
  todaysTotal = {credit: 0, debit: 0};
  totalIncome = 0;
  totalExpense = 0;
  TransactionsDetail = {};
  recentGraphData = {
    label: ['Jan', 'Feb', 'Mar', 'Apr'],
    credit: [],
    debit: [],
  };
  userAllBanks = [];
  filteredSMS = [];
  fSelectedBank = {
    Bank: {},
    type: {isCredit: ''},
  };
  constructor() {
    makeAutoObservable(this);
  }
  async setSms(value) {
    if (value?.length > 0) {
      var tempData = value.map(res => ({
        ...res,
        time: res.time ? res?.time : res.date,
      }));
      var list = await filterSMS(tempData);
      var finalAmount = 0;
      var Expanse = 0;
      var income = 0;

      var temp = list.map(item => {
        var smsBody = item?.body?.toLowerCase()?.replace(/[^\w\.]/g, '');

        var amount = extractAmountFromSMS(smsBody);
        var accountNumber = AccountNumber(smsBody);
        var CARDNumber = IsCreditCard(smsBody);
        var UPI_ID = hasUPIid(item?.body);

        finalAmount = finalAmount + Number(amount);

        income = item?.isCredited
          ? Number(amount)
            ? Number(income) + Number(amount)
            : 0
          : Number(income) + 0;
        Expanse = !item?.isCredited
          ? Number(amount)
            ? Number(Expanse) + Number(amount)
            : 0
          : Expanse + 0;
        return {
          other: item,

          body: item?.body,
          amount: amount,
          address: UPI_ID
            ? UPI_ID
            : accountNumber
            ? 'A/C XX' + accountNumber
            : CARDNumber
            ? 'CARD-' + CARDNumber
            : item.address,
          time: item.time ? item?.time : item.date,
          isCredited: item?.isCredited,
          title: accountNumber,
          isCard: CARDNumber,
          code: item?.code,
          type: UPI_ID
            ? 'UPI'
            : CARDNumber
            ? 'CARD'
            : accountNumber
            ? 'A/C'
            : '',
        };
      });
      // var dateTime = temp.map(res => {
      //   var time = res.time ? res.time : res.date;
      //   return moment(time).format('ll hh:mm:ss');
      // });
      // console.log(
      //   '🚀 ~ file: MainStore.js:39 ~ MainStore ~ dateTime ~ dateTime:',
      //   dateTime,
      // );
      this.sms = temp;
      this.filteredSMS = temp;

      this.totalAmount = finalAmount;
      this.totalIncome = income;
      this.totalExpense = Expanse;
      this.setRecentGraphData(temp);
    }
  }

  setRecentGraphData(list) {
    this.resentTrans = filterByDays(list, 1);
    var filteredData = filterByDays(list, 6);
    var filteredDataLabel = sumSameDayTrans(filteredData);
    console.log(
      '🚀 ~ file: MainStore.js:113 ~ MainStore ~ setRecentGraphData ~ filteredDataLabel:',
      filteredData,
    );
    var creditDates = Object?.keys(filteredDataLabel?.credit);
    var debitDates = Object?.keys(filteredDataLabel?.debit);
    var label = [...new Set([...creditDates, ...debitDates])].sort();

    var creditAmount = label?.map(e => {
      if (filteredDataLabel?.credit[e]) {
        return filteredDataLabel?.credit[e].amount;
      } else {
        return 0;
      }
    });
    var debitAmount = label?.map(e => {
      if (filteredDataLabel?.debit[e]) {
        return filteredDataLabel?.debit[e].amount || 0;
      } else {
        return 0;
      }
    });

    this.todaysTotal.credit = creditAmount?.reduce(
      (partialSum, a) => partialSum + a,
      0,
    );
    this.todaysTotal.debit = debitAmount?.reduce(
      (partialSum, a) => partialSum + a,
      0,
    );
    console.log({
      label: label,
      credit: creditAmount,
      debit: debitAmount,
    });
    this.recentGraphData = {
      label: label,
      credit: creditAmount,
      debit: debitAmount,
    };
  }

  setTransactionDetail(value) {
    this.TransactionsDetail = value;
  }
  setUserAllBanks(value) {
    this.userAllBanks = value;
  }
  setFilterByBank(value) {
    console.log(
      '🚀 ~ file: MainStore.js:147 ~ MainStore ~ setFilterByBank ~ value:',
      value,
    );
    this.fSelectedBank = value;
    var temp = this.sms;
    if (value?.Bank?.code) {
      temp = temp?.filter(ele => ele?.code === value?.Bank?.code);
    }
    if (value?.type?.isCredit !== '') {
      var data =
        value.type.isCredit === 'credit'
          ? true
          : value.type.isCredit === 'debit' && false;
      console.log('data', data);
      temp = temp.filter(ele => ele.isCredited === data);
    }

    this.filteredSMS = temp;
  }
  clearFilter() {
    this.fSelectedBank = {};
    this.filteredSMS = this.sms;
  }
}

export const mainStore = new MainStore();
