import {Alert, Linking} from 'react-native';

export const showUpdateAlert = ({isForceUpdate, closedTestingLink}) => {
  Alert.alert(
    'Update Available',
    isForceUpdate
      ? 'A critical update is required to continue using the app.'
      : 'A new version of the app is available. Please update to access the latest features.',
    [
      {
        text: 'Update Now',
        onPress: () => {
          Linking.openURL(
            closedTestingLink || 'market://details?id=com.your.app.id',
          );
        },
      },
      !isForceUpdate
        ? {
            text: 'Later',
            style: 'cancel',
          }
        : null,
    ].filter(button => button !== null),
    {
      cancelable: !isForceUpdate,
    },
  );
};
