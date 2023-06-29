import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const start = { x: 0, y: 0 };
const end = { x: 0, y: 1 };

const BackgroundGradient = ({
  children,
}) => {
  return (
    <LinearGradient
      end={end}
      start={start}
      locations={[0.6, 1]}
      style={styles.gradient}
      colors={['#FDFCF8', '#FFFFFF']}
    >
      {children}
    </LinearGradient>
  );
}

export default BackgroundGradient;

const styles = StyleSheet.create({
  gradient: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    position: 'absolute',
    backgroundColor: '#F5F5F5',
  },
});
