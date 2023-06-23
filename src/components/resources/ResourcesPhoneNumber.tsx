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

const ResourcesPhoneNumber = ({
  phoneNumber,
}) => {
  const handlePress = async () => {
    try {
      await Linking.openURL(`tel:${phoneNumber.phone}`);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.phone}>
        {phoneNumber.name}
      </Text>

      <View style={styles.buttonContainer}>
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
            {phoneNumber.phone}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResourcesPhoneNumber;

const styles = ScaledSheet.create({
  container: {
    marginBottom: '20@vs',
  },
  phone: {
    color: '#111827',
    fontSize: '20@msr',
    lineHeight: '27@msr',
    fontFamily: 'EncodeSans-SemiBold',
  },
  buttonContainer: {
    marginTop: '8@vs',
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
});
