/* eslint-disable react-native/no-inline-styles */
import analytics from '@react-native-firebase/analytics';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AiChat, Dashboard, Expenses, Profile} from '../../Screens/index';
import {scale} from '../../Utils/responsive';
//settings-outline wallet-outline add-circle-outline home-outline
//settings wallet add-circle home
Icon.loadFont();
const BottomTab = createBottomTabNavigator();
function MyTabBar({state, descriptors, navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const {colors} = useTheme();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const animateTab = useCallback(
    index => {
      Animated.spring(tabOffsetValue, {
        toValue: getWidth() * index,
        useNativeDriver: true,
      }).start();
    },
    [tabOffsetValue],
  );
  const [showTab, setShowTab] = React.useState(true);
  useEffect(() => {
    animateTab(state.index);
  }, [state.index, animateTab]);
  useEffect(() => {
    const _keyboardDidShow = () => {
      setShowTab(false);
      scrollY.setValue(-100);
    };
    const _keyboardDidHide = () => {
      setShowTab(true);
      scrollY.setValue(0);
    };
    const Subs = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Subs.remove();
    };
  }, [scrollY]);

  const onPress = async (route, index, isFocused) => {
    try {
      // Animate the tab first
      animateTab(index);

      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // Navigate first
        navigation.navigate(route.name);

        // Then track the screen view
        await analytics().logScreenView({
          screen_name: route.name,
          screen_class: route.name,
        });
      }
    } catch (error) {
      console.log('Tab navigation error:', error);
    }
  };

  return (
    <>
      {showTab && (
        <>
          <Animated.View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginBottom: Platform.OS === 'ios' ? 20 : 10,
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
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              return (
                <Pressable
                  key={label}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={() => onPress(route, index, isFocused)}
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
                </Pressable>
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
  // Add screen tracking when tabs mount
  useEffect(() => {
    const trackInitialScreen = async () => {
      await analytics().logScreenView({
        screen_name: 'Dashboard',
        screen_class: 'Dashboard',
      });
    };
    trackInitialScreen();
  }, []);

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
          name="AI Chat"
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
