import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import {Shadow} from '../../Utils/constant';
import TextCustom from '../Text/Text';
import {observer} from 'mobx-react';
import {mainStore} from '../../Store/MainStore';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const CardChart = () => {
  const styles = GetStyles();
  const {colors} = useTheme();
  const [date, setDate] = useState(new Date());
  const data = {
    labels: mainStore?.recentGraphData?.label,

    datasets: [
      {
        data: mainStore?.recentGraphData?.debit,
        color: (opacity = 1) => `rgba(238, 163, 163, ${opacity})`, // optional
        strokeWidth: 4, // optional
      },
      {
        data:
          mainStore?.recentGraphData?.credit.length > 0
            ? mainStore?.recentGraphData?.credit
            : [0],
        color: (opacity = 1) => `rgba(129, 178, 202,  ${opacity})`, // optional
        strokeWidth: 4, // optional
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: colors.my_primary,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.my_primary,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
    propsForBackgroundLines: {
      strokeDasharray: '',
    },
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (event.type === 'neutralButtonPressed') {
      mainStore.setRecentTransactions(new Date());
      return setDate(new Date());
    }

    mainStore.setRecentTransactions(currentDate);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date(),
      neutralButton: {label: 'Clear', textColor: 'grey'},
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View style={[styles.main, Shadow]}>
      <View style={styles.InExpContainer}>
        <View style={styles.column}>
          <TextCustom title={'Credits'} styles={styles.textHeading} />
          <TextCustom
            title={`₹ ${mainStore.totalIncome?.toLocaleString('hi-IN')}`}
            // title={mainStore?.totalIncome}
            styles={styles.textAmount}
          />
        </View>
        <View>
          <TextCustom
            title={'Debits'}
            styles={{...styles.textHeading, color: colors.my_addOne}}
          />
          <TextCustom
            title={`₹ ${mainStore.totalExpense?.toLocaleString('hi-IN')}`}
            styles={styles.textAmount}
          />
        </View>
        <TouchableOpacity onPress={showDatepicker}>
          <Icon name={'calendar'} size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth * 0.8}
          height={screenHeight * 0.29}
          chartConfig={chartConfig}
          bezier
          fromZero
          segments={6}
          formatYLabel={e => `₹${Number(e).toFixed(1)}`}
          withVerticalLines={false}
          verticalLabelRotation={30}
        />
      </View>
    </View>
  );
};

export default observer(CardChart);
const GetStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    main: {
      borderRadius: 15,
      backgroundColor: colors.my_primary,
      //   height: '80%',
      padding: 25,
      marginVertical: 10,
    },
    InExpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    column: {},
    textHeading: {
      fontWeight: '600',
      fontSize: 14,
      color: colors.my_tertiary,
    },
    textAmount: {
      fontWeight: '600',
      fontSize: 16,
    },
    chartContainer: {
      marginTop: 18,
    },
  });
};
