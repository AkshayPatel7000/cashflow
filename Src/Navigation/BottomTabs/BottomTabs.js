import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from '../../Utils/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SVG from '../../Assets/SVG';
import {
  Dashboard,
  Expenses,
  Profile,
  SearchContact,
  Wallet,
  AiChat,
} from '../../Screens/index';
import {LocalStorage} from '../../Utils/localStorage';
//settings-outline wallet-outline add-circle-outline home-outline
//settings wallet add-circle home
Icon.loadFont();
const BottomTab = createBottomTabNavigator();
function MyTabBar({state, descriptors, navigation}) {
  const animatedRef = useRef(null);
  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
  });
  const {colors, dark} = useTheme();
  const navigation2 = useNavigation();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const animateTab = index => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth() * index,
      useNativeDriver: true,
    }).start();
  };
  const [showTab, setShowTab] = React.useState(true);
  useEffect(() => {
    animateTab(state.index);
  }, [state.index]);
  useEffect(() => {
    const Subs = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Subs.remove();
    };
  }, []);
  const _keyboardDidShow = () => {
    setShowTab(false);
    scrollY.setValue(-100);
  };
  const _keyboardDidHide = () => {
    setShowTab(true);
    scrollY.setValue(0);
  };
  return (
    <>
      {showTab && (
        <>
          <Animated.View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginBottom: Platform.OS == 'ios' ? 20 : 0,
              backgroundColor: colors.my_primary,
              height: 60,
            }}>
            <Animated.View
              style={{
                width: getWidth() - scale(40),
                height: 3,
                backgroundColor: colors.my_tertiary,
                position: 'absolute',
                bottom: 60,
                // Horizontal Padding = 20...
                left: scale(30),
                borderRadius: 30,
                transform: [{translateX: tabOffsetValue}],
              }}
            />
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
              const isFocused = state.index === index;
              const onPress = async () => {
                animateTab(index);
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation2.navigate({name: route.name, merge: true});
                }
              };
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              return (
                <TouchableOpacity
                  key={label}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={() => onPress()}
                  onLongPress={() => onLongPress()}
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                  }}>
                  {isFocused ? (
                    <Icon
                      name={options.icon}
                      size={28}
                      color={colors.my_tertiary}
                    />
                  ) : (
                    <Icon
                      name={options.iconInActive}
                      size={28}
                      color={colors.text}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </>
      )}
    </>
  );
}
function getWidth() {
  let width = Dimensions.get('screen').width;
  // Horizontal Padding = 20...
  width = width - scale(20);
  // Total five Tabs...
  return width / 4;
}
const BottomTabs = () => {
  const {colors, dark} = useTheme();
  return (
    <>
      <BottomTab.Navigator
        tabBar={tabsProps => <MyTabBar {...tabsProps} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
        options={{tabBarHideOnKeyboard: true}}
        initialRouteName="Dashboard">
        <BottomTab.Screen
          name="Dashboard"
          options={{
            tabBarHideOnKeyboard: true,
            icon: 'home',
            iconInActive: 'home-outline',
          }}
          component={Dashboard}
        />
        <BottomTab.Screen
          name="Expenses"
          options={{
            icon: 'add-circle',
            iconInActive: 'add-circle-outline',
          }}
          component={Expenses}
        />
        <BottomTab.Screen
          name="Wallet"
          options={{
            icon: 'chatbubbles-sharp',
            iconInActive: 'chatbubbles-outline',
          }}
          component={AiChat}
        />
        <BottomTab.Screen
          name="Profile"
          options={{
            tabBarHideOnKeyboard: true,
            icon: 'settings',
            iconInActive: 'settings-outline',
          }}
          component={Profile}
        />
      </BottomTab.Navigator>
    </>
  );
};
export default BottomTabs;
