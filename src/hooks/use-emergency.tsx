import { useCallback } from 'react';
import { Linking } from 'react-native';

const emergencyPhone = '112';

const useEmergency = () => {
  const callEmergency = useCallback(() => {
    try {
      Linking.openURL(`tel:${emergencyPhone}`);
    } catch (error) {}
  }, []);

  return {
    callEmergency,
  };
};

export default useEmergency;
