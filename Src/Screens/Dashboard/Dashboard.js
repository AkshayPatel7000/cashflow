import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../Components/Container/Container';
import TextCustom from '../../Components/Text/Text';
import HomeHeader from '../../Components/Headers/HomeHeader';
import VirtualizedScrollView from '../../Components/VirtualisedScroll';
import CardChart from '../../Components/Home/CardChart';
import BudgetContainer from '../../Components/Home/BudgetContainer';
import TransactionContainer from '../../Components/Home/TransactionContainer';

const Dashboard = () => {
  return (
    <Container>
      <HomeHeader />
      <VirtualizedScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <CardChart />
        {/* <BudgetContainer /> */}
        <TransactionContainer />
      </VirtualizedScrollView>
    </Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  contentContainerStyle: {
    // paddingBottom: 60,
    paddingHorizontal: 14,
    // flex: 1,
  },
});
