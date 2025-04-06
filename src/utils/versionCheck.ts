import {Platform} from 'react-native';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';

export const checkAppVersion = async () => {
  try {
    if (Platform.OS !== 'android') return false;

    const currentVersion = DeviceInfo.getVersion();
    const response = await axios.get(
      'https://play.google.com/store/apps/details?id=com.your.app.id&hl=en',
    );

    const match = response.data.match(/Current Version.+?>([\d\.]+)</i);
    const storeVersion = match ? match[1] : currentVersion;

    return {
      needsUpdate: compareVersions(currentVersion, storeVersion),
      storeVersion,
    };
  } catch (error) {
    console.log('Version check error:', error);
    return false;
  }
};

const compareVersions = (current: string, store: string) => {
  const currentParts = current.split('.').map(Number);
  const storeParts = store.split('.').map(Number);

  for (let i = 0; i < storeParts.length; i++) {
    if (currentParts[i] < storeParts[i]) return true;
    if (currentParts[i] > storeParts[i]) return false;
  }
  return false;
};
interface VersionInfo {
  latestVersion: string;
  minVersion: string;
  closedTestingLink: string;
  isForceUpdate: boolean;
}

export const checkAppVersionFirebase = async () => {
  try {
    if (Platform.OS !== 'android') return false;

    const currentVersion = DeviceInfo.getVersion();

    // Get version info from Firestore
    const versionDoc = await firestore()
      .collection('app_config')
      .doc('version_control')
      .get();

    if (!versionDoc.exists) {
      return false;
    }

    const versionInfo = versionDoc.data() as VersionInfo;
    console.log('🚀 ~ checkAppVersionFirebase ~ versionInfo:', versionInfo);

    return {
      needsUpdate: compareVersions(currentVersion, versionInfo.latestVersion),
      isForceUpdate: compareVersions(currentVersion, versionInfo.minVersion),
      storeVersion: versionInfo.latestVersion,
      closedTestingLink: versionInfo.closedTestingLink,
    };
  } catch (error) {
    console.log('Version check error:', error);
    return false;
  }
};
