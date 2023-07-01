import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../Components/Container/Container';
import TextCustom from '../../Components/Text/Text';
import HomeHeader from '../../Components/Headers/HomeHeader';
import VirtualizedScrollView from '../../Components/VirtualisedScroll';
import CardChart from '../../Components/Home/CardChart';
import BudgetContainer from '../../Components/Home/BudgetContainer';
import TransactionContainer from '../../Components/Home/TransactionContainer';
import {check} from 'react-native-permissions';
import {_onSmsListenerPressed, request_PERMISSIONS} from '../../Utils/Helper';
import {observer} from 'mobx-react';

const Dashboard = props => {
  const [hasPer, sethasPer] = useState(false);
  useEffect(() => {
    init();
  }, [props]);

  const init = async () => {
    const status = await check('android.permission.READ_SMS');
    if (status == 'granted') {
      _onSmsListenerPressed('android.permission.READ_SMS');
      sethasPer(true);
    }
  };
  const reqPerm = async () => {
    var request = await request_PERMISSIONS('android.permission.READ_SMS');
    console.log('🚀 ~ file: Dashboard.js:27 ~ reqPerm ~ request:', request);
    if (request === 'blocked') {
      return Linking.openSettings();
    }
    if (request === 'granted') {
      sethasPer(true);
    }
  };

  if (!hasPer) {
    return (
      <Container>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextCustom title={'Please allow SMS permission'} />
          <TouchableOpacity
            onPress={() => reqPerm()}
            style={{
              backgroundColor: '#000',
              paddingVertical: 20,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              marginTop: 20,
            }}>
            <TextCustom title={'Grant Permission'} styles={{color: '#fff'}} />
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
  return (
    <Container>
      <HomeHeader />
      <VirtualizedScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <CardChart />
        <BudgetContainer />
        <TransactionContainer />
      </VirtualizedScrollView>
    </Container>
  );
};

export default observer(Dashboard);

const styles = StyleSheet.create({
  contentContainerStyle: {
    // paddingBottom: 60,
    paddingHorizontal: 14,
    // flex: 1,
  },
});
