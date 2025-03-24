import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LogBox, StyleSheet, useColorScheme} from 'react-native';
import AppStack from './AppStack/AppStack';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();
const myLight = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    my_primary: '#F4F6F6',
    my_secondary: '#FFFFFF',
    my_tertiary: '#81B2CA',
    my_addOne: '#EBAAAA',
    my_heading: '#2A2A2A',
    my_subHeading: '#1A202C',
    my_text: '#030303',
    my_white: '#fff',
    my_Black: '#000',
  },
};
const myDark = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    my_primary: '#F4F6F6',
    my_secondary: '#FFFFFF',
    my_tertiary: '#81B2CA',
    my_addOne: '#EBAAAA',
    my_heading: '#2A2A2A',
    my_subHeading: '#1A202C',
    my_text: '#030303',
    my_white: '#fff',
    my_Black: '#000',
  },
};

const Routes = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? myDark : myLight}>
      <Stack.Navigator
        headerMode={false}
        animationEnabled={true}
        screenOptions={{
          headerShown: false,
        }}>
        {AppStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
