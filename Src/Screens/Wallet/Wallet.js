import React, {useEffect, useState} from 'react';
// Import required components
import {observer} from 'mobx-react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Container from '../../Components/Container/Container';
import {mainStore} from '../../Store/MainStore';
import {filterByMonth} from '../../Utils/Helper';
import TextCustom from '../../Components/Text/Text';
import TransactionCard from '../../Components/Home/TransactionCard';
import VirtualizedScrollView from '../../Components/VirtualisedScroll';
import CommonHeader from '../../Components/Headers/CommonHeader';

const ExpandableComponent = ({item, onClickFunction}) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <TextCustom style={styles.headerText} title={item.month} />
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,

          overflow: 'scroll',
        }}>
        {/*Content under the header of the Expandable List Item*/}
        {item.dataList.map((item, key) => (
          <TransactionCard item={item} ShowShadow={false} />
        ))}
      </View>
    </View>
  );
};

const Wallet = () => {
  const [listDataSource, setListDataSource] = useState(
    mainStore.filterMyMonths,
  );
  const [multiSelect, setMultiSelect] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };
  return (
    <Container>
      <CommonHeader title="Monthly View" />
      <VirtualizedScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        {listDataSource.map((item, key) => (
          <ExpandableComponent
            key={item.month}
            onClickFunction={() => {
              updateLayout(key);
            }}
            item={item}
          />
        ))}
      </VirtualizedScrollView>

      {/* <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Lottie
          source={require('../../Assets/JSON/uc.json')}
          autoPlay
          loop
          style={{width: Dimensions.get('screen').width * 0.7}}
        />
      </View> */}
    </Container>
  );
};

export default observer(Wallet);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 14,
  },
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    // backgroundColor: '#F5FCFF',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});
