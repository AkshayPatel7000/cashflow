import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../Components/Container/Container';
import {useTheme} from '@react-navigation/native';
import TextCustom from '../../Components/Text/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Feather';
import {showError} from '../../Utils/Helper';
import {searchMobile} from '../../Services/TrueService';
import Loading from '../../Components/Loading';
import Spinner from '../../Components/Spinner';

const SearchContact = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const [query, setQuery] = useState('');
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const validateMobileNumber = () => {
    const pattern = /^(\+91?|0)?([6-9]\d{9})$/;

    if (pattern.test(query)) {
      return true;
    }
    showError('Please enter valid mobile number.');
  };

  const onSearch = async () => {
    try {
      if (validateMobileNumber()) {
        setLoader(true);
        const {data} = await searchMobile(query);

        console.log('🚀 ~ file: SearchContact.js:41 ~ onSearch ~ data:', data);

        setUserData(data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);

      console.log('🚀 ~ onSearch ~ error:', error);
    }
  };

  return (
    <Container>
      {loader && <Spinner />}
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <View style={styles.searchContainer}>
            <View style={styles.userIcon}>
              <Icon name={'person'} size={18} color={colors.card} />
            </View>
            <TextInput
              keyboardType="number-pad"
              placeholderTextColor={colors.border}
              placeholder="Search mobile number"
              style={styles.input}
              value={query}
              onChangeText={e => {
                const d = e.replace(/ +/g, '');
                setQuery(d);
              }}
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
            <Icon name={'search'} size={18} color={colors.card} />
          </TouchableOpacity>
        </View>
        {userData?.length > 0 && (
          <View style={styles.lowerContainer}>
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '70%'}}>
                <TextCustom title={'Identified by'} styles={styles.identify} />
                <TextCustom title={userData[0].name} styles={styles.userName} />
              </View>
              <View>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: '#006ccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {userData[0].image ? (
                    <Image
                      source={{uri: userData[0].image}}
                      style={{width: '100%', height: '100%', borderRadius: 40}}
                    />
                  ) : (
                    <TextCustom
                      title={userData[0]?.name && userData[0]?.name[0]}
                      styles={{fontSize: 26, color: colors.card}}
                    />
                  )}
                </View>
              </View>
            </View>
            <View style={styles.innerContainer}>
              <View style={styles.section}>
                <Entypo name={'phone'} size={18} color={'#006ccc'} />
                <View style={styles.inner}>
                  <TextCustom
                    title={userData[0].phones[0].carrier}
                    styles={styles.h1}
                  />
                  <TextCustom
                    title={userData[0].phones[0].nationalFormat}
                    styles={styles.h2}
                  />
                </View>
              </View>
              <View style={styles.section}>
                <Entypo name={'navigation'} size={18} color={'#006ccc'} />
                <View style={styles.inner}>
                  <TextCustom title={'Address'} styles={styles.h1} />
                  <TextCustom
                    title={userData[0].addresses[0].city}
                    styles={styles.h2}
                  />
                </View>
              </View>
              {userData[0].internetAddresses.length > 0 && (
                <View style={styles.section}>
                  <Entypo name={'mail'} size={18} color={'#006ccc'} />
                  <View style={styles.inner}>
                    <TextCustom title={'Email'} styles={styles.h1} />
                    <TextCustom
                      title={userData[0].internetAddresses[0]?.id}
                      styles={styles.h2}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </Container>
  );
};

export default SearchContact;

const getStyles = colors => {
  return StyleSheet.create({
    identify: {
      color: colors.my_white,
    },
    userName: {
      color: colors.my_white,
      fontSize: 22,
    },
    main: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {flexDirection: 'row', justifyContent: 'space-between'},
    searchContainer: {
      height: 55,
      width: '75%',
      borderWidth: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      paddingHorizontal: 10,
      backgroundColor: colors.card,
      borderColor: colors.my_tertiary,
      flexDirection: 'row',
    },
    userIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.my_tertiary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      paddingHorizontal: 20,
      color: colors.text,
      fontSize: 16,
    },
    searchButton: {
      width: '23%',
      height: 55,
      backgroundColor: colors.my_tertiary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
    },
    lowerContainer: {
      width: '100%',

      marginVertical: 20,
      borderRadius: 20,
      backgroundColor: colors.my_tertiary,
    },
    innerContainer: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
    },
    section: {flexDirection: 'row', marginVertical: 5},
    h1: {
      //   fontSize: 16,
      fontWeight: '600',
      color: colors.my_heading,
    },
    h2: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.my_heading,
      width: '80%',
    },
    inner: {marginLeft: 10, width: '100%'},
  });
};
