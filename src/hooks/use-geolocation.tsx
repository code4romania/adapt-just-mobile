import {
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const useGeolocation = () => {
  const hasPermissionIOS = async () => {
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    let promise = new Promise((resolve, reject) => {
      if (!hasPermission) {
        reject(null);
      }
    
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(null);
        },
        {
          accuracy: {
            ios: 'best',
            android: 'high',
          },
          timeout: 15000,
          distanceFilter: 0,
          maximumAge: 10000,
          enableHighAccuracy: true,
          showLocationDialog: true,
          forceRequestLocation: true,
          forceLocationManager: false,
        },
      );
    });

    return promise;
  };

  return {
    getLocation,
  };
};

export default useGeolocation;
