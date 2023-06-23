import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../Components/Container/Container';
import CommonHeader from '../../Components/Headers/CommonHeader';
import TransactionCardList from '../../Components/Home/TransactionCardList';
import VirtualizedScrollView from '../../Components/VirtualisedScroll';
import {observer} from 'mobx-react';
import {mainStore} from '../../Store/MainStore';

const Expenses = () => {
  return (
    <Container>
      <CommonHeader />
      <VirtualizedScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <TransactionCardList data={mainStore.sms} />
      </VirtualizedScrollView>
    </Container>
  );
};

export default observer(Expenses);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 14,
  },
});
