import React from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { phoneIcon } from '~/assets/images';

const PhoneButton = ({
  label = '',
  phone = '',
}) => {
  const handlePress = async () => {
    if (!phone) {
      return;
    }

    try {
      await Linking.openURL(`tel:${phone}`);
    } catch (error) {}
  };
  
  return (
    <View>
      {!!label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
          <SvgXml
            height={vs(16)}
            xml={phoneIcon}
            style={styles.icon}
          />

          <Text style={styles.phone}>
            {phone}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PhoneButton;

const styles = ScaledSheet.create({
  label: {
    color: '#111827',
    fontSize: '20@msr',
    lineHeight: '27@ms',
    marginBottom: '8@vs',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Semibold',
  },
  container: {
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '6@msr',
    borderColor: '#D1D5DB',
    backgroundColor: '#FFF',
    paddingVertical: '13@vs',
    paddingHorizontal: '25@s',

    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  icon: {
    marginRight: '14@s',
  },
  phone: {
    color: '#111827',
    fontSize: '20@msr',
    lineHeight: '27@msr',
    fontFamily: 'EncodeSans-SemiBold',
  },
});
