import {
  useCallback,
} from 'react';
import {
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
} from 'react-native-permissions';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const useMediaPicker = (mediaType = 'mixed') => {
  const openSettings = useCallback(async () => {
    try {
      await Linking.openSettings();
    } catch (e) {}
  }, []);

  const openCamera = () => {
    return new Promise((resolve, reject) => {
      launchCamera({ mediaType }, (response) => {
        if (!response.didCancel && !response.errorCode) {
          resolve(response);
        }

        reject(null);
      });
    });
  };

  const openMediaLibrary = () => {
    return new Promise((resolve, reject) => {
      launchImageLibrary({ mediaType }, (response) => {
        if (!response.didCancel && !response.errorCode) {
          resolve(response);
        }

        reject(null);
      });
    });
  };

  const checkPermission = () => {
    let permission = null;

    return new Promise((resolve, reject) => {
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.CAMERA;
      }

      if (Platform.OS === 'android') {
        permission = PERMISSIONS.ANDROID.CAMERA;
      }

      if (!permission) {
        reject(false);
      }

      check(permission)
        .then((result) => {
          if (result === RESULTS.DENIED) {
            request(permission).then(pResult => {
              if (pResult === RESULTS.GRANTED) {
                resolve(true);
              }
            });
          } else if (result === RESULTS.BLOCKED) {
            alertPermissionUnavailable();
            reject(false);
          } else if (result === RESULTS.GRANTED) {
            resolve(true);
          }
        })
        .catch(() => reject(false));
    });
  };

  const alertPermissionUnavailable = () => {
    Alert.alert(
      'Camera este dezactivată'.toUpperCase(),
      'Pentru a fotografia este nevoie de activarea camerei din setările telefonului.'.toUpperCase(),
      [
        {
          text: 'ANULEAZĂ',
          style: 'cancel',
          onPress: () => null,
        },
        {
          text: 'SETĂRI',
          onPress: openSettings,
        }
      ],
      { cancelable: false }
    );
  };

  return {
    openCamera,
    checkPermission,
    openMediaLibrary,
  };
};

export default useMediaPicker;
