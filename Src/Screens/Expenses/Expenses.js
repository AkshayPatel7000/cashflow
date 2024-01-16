import {observer} from 'mobx-react';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Container from '../../Components/Container/Container';
import CommonHeader from '../../Components/Headers/CommonHeader';
import TransactionCardList from '../../Components/Home/TransactionCardList';
import VirtualizedScrollView from '../../Components/VirtualisedScroll';
import {mainStore} from '../../Store/MainStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import Filter from '../../Components/FilterComponent/Filter';
import {getCommonBanks} from '../../Utils/Helper';
const Expenses = props => {
  const modalizeRef = useRef();
  const {colors} = useTheme();
  const open = () => {
    modalizeRef?.current?.open();
  };
  const close = () => {
    modalizeRef?.current?.close();
  };
  useEffect(() => {
    getCommonBanks();
  }, [props]);

  return (
    <Container>
      <CommonHeader
        rightIconOnPress={open}
        rightIcon={() => (
          <Icon name={'filter-list'} size={25} color={colors.text} />
        )}
      />
      <VirtualizedScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <TransactionCardList data={mainStore.filteredSMS} />
      </VirtualizedScrollView>
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <Filter close={close} />
      </Modalize>
    </Container>
  );
};

export default observer(Expenses);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 14,
  },
});
