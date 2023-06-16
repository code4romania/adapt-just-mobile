import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { prevIcon } from '~/assets/images';

const HomeButton = () => {
  const navigation = useNavigation();

  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateHome}
    >
      <SvgXml
        xml={prevIcon}
        height={ms(24)}
        style={styles.icon}
      />

      <Text style={styles.text}>
        Ecran principal
      </Text>
    </TouchableOpacity>
  );
};

export default HomeButton;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: '6@msr',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FBBF24',
    paddingVertical: '8@vs',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: '17@s',

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 6,
    shadowOpacity: 0.1,

    // Android
    elevation: 5
  },
  icon: {
    marginRight: '14@s',
  },
  text: {
    color: '#111827',
    fontSize: '16@msr',
    lineHeight: '24@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
});
