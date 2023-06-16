import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { nextIcon } from '~/assets/images';

const NextButton = ({
  enabled = true,
  loading = false,
  text = 'Continuă',
  onPress = () => {},
}) => {
  const isDisabled = !enabled || loading;

  const buttonStyle = [
    styles.button,
    !enabled && styles.disabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={isDisabled}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {text}
      </Text>

      {loading && (
        <ActivityIndicator
          size="small"
          color="#111827"
          style={styles.icon}
        />
      )}

      {!loading && (
        <SvgXml
          xml={nextIcon}
          height={ms(24)}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};

export default NextButton;

const styles = ScaledSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '8@msr',
    justifyContent: 'center',
    paddingVertical: '12@vs',
    paddingHorizontal: '17@s',
    backgroundColor: '#FBBF24',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  disabled: {
    backgroundColor: '#FBBF2459',
  },
  text: {
    color: '#111827',
    fontSize: '20@msr',
    lineHeight: '25@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  icon: {
    marginLeft: '12@s',
  },
});
