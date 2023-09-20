import {makeAutoObservable} from 'mobx';
import {
  AccountNumber,
  IsCreditCard,
  extractAmountFromSMS,
  filterByDays,
  filterByMonth,
  filterSMS,
  getTodaysTransactions,
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
  selectedDate = new Date();
  filterMyMonths = {
    credits: ['credited', 'creditedto', 'Credited'],
    debits: [
      'debited',
      'spent',
      'debited for',
      'Money Transfer:',
      'transaction number',
    ],
  };

  firebaseData = {};
  constructor() {
    makeAutoObservable(this);
  }

  setFirebaseData(data) {
    if (data.credits && data.debits) {
      this.firebaseData = data;
    }
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
      this.sms = temp;
      this.filteredSMS = temp;

      this.totalAmount = finalAmount;
      // this.totalIncome = income;
      // this.totalExpense = Expanse;
      this.setFilterByMonth(temp);
      this.setRecentGraphData(temp);
    }
  }

  setRecentGraphData(list) {
    this.setRecentTransactions(new Date(), list);
    var filteredData = filterByDays(list, 6);
    var filteredDataLabel = sumSameDayTrans(filteredData);

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

    const todaysTotalcredit = creditAmount?.reduce(
      (partialSum, a) => partialSum + a,
      0,
    );
    const todaysTotaldebit = debitAmount?.reduce(
      (partialSum, a) => partialSum + a,
      0,
    );

    this.totalIncome = todaysTotalcredit;
    this.totalExpense = todaysTotaldebit;

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
  setFilterByMonth(value) {
    this.filterMyMonths = filterByMonth(value);
  }
  setRecentTransactions(date = new Date(), list = this.filteredSMS) {
    this.selectedDate = date;
    const todayTrans = getTodaysTransactions(list, date);
    this.resentTrans = todayTrans;
    var filteredDataLabel = sumSameDayTrans(todayTrans);
    this.todaysTotal.credit =
      Object.values(filteredDataLabel?.credit).length > 0
        ? Object.values(filteredDataLabel?.credit)[0].amount
        : 0;

    this.todaysTotal.debit =
      Object.values(filteredDataLabel?.debit).length > 0
        ? Object.values(filteredDataLabel?.debit)[0].amount
        : 0;
  }
}

export const mainStore = new MainStore();
