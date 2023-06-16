import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { returnIcon } from '~/assets/images';

const SuccessHomeButton = ({
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        Ecran principal
      </Text>

      <SvgXml
        height={vs(20)}
        xml={returnIcon}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default SuccessHomeButton;

const styles = ScaledSheet.create({
  button: {
    borderRadius: '8@msr',
    flexDirection: 'row',
    alignItems: 'center',
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
