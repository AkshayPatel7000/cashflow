import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react';
import React from 'react';
import {LogBox, useColorScheme} from 'react-native';
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
  },
};
export default Routes = observer(() => {
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
});
