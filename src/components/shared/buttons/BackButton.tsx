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

import { prevIcon } from '~/assets/images';

const BackButton = ({
  text = 'Înapoi',
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <SvgXml
        xml={prevIcon}
        height={vs(24)}
        style={styles.icon}
      />
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = ScaledSheet.create({
  button: {
    borderRadius: '8@msr',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '12@vs',
    paddingHorizontal: '17@s',
  },
  text: {
    color: '#111827',
    fontSize: '20@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  icon: {
    marginRight: '12@s',
  },
});
