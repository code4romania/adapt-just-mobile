import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

const LoadingView = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color="#FBBF24"
      />
    </View>
  );
};

export default LoadingView;

const styles = ScaledSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
