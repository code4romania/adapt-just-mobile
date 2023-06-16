import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

const RadioCheck = ({
  checked = false,
}) => {
  const containerStyle = [
    styles.container,
    checked && styles.checked,
  ];

  return (
    <View style={containerStyle}>
      <View style={styles.inner} />
    </View>
  );
};

export default RadioCheck;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    width: '16@msr',
    height: '16@msr',
    alignItems: 'center',
    borderRadius: '8@msr',
    borderColor: '#D1D5DB',
    justifyContent: 'center',
  },
  checked: {
    borderColor: '#D97706',
    backgroundColor: '#D97706',
  },
  inner: {
    width: '6@msr',
    height: '6@msr',
    borderRadius: '4@msr',
    backgroundColor: '#FFF',
  },
});
