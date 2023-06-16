import React from 'react';
import { View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

const FormStepper = ({
  step = 1,
  steps = 1,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        PASUL {step} din {steps}
      </Text>

      <View style={styles.dots}>
        {Array(steps).fill().map((_, i) => (
          <View
            key={`step_${i}`}
            style={[
              i + 1 === step && styles.current,
            ]}
          >
            <View
              style={[
                styles.step,
                i + 1 <= step && styles.completed,
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default FormStepper;

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: '#111827',
    fontSize: '14@msr',
    lineHeight: '16@msr',
    fontFamily: 'EncodeSans-Medium',
  },
  dots: {
    marginTop: '11@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  step: {
    width: '10@msr',
    height: '10@msr',
    borderRadius: '5@msr',
    marginHorizontal: '4@s',
    backgroundColor: '#E5E7EB',
  },
  completed: {
    backgroundColor: '#D97706',
  },
  current: {
    width: '20@msr',
    height: '20@msr',
    alignItems: 'center',
    borderRadius: '10@msr',
    justifyContent: 'center',
    backgroundColor: '#FDE68A',
  },
});
