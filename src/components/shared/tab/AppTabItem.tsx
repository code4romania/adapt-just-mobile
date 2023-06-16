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

import {
  hideIcon,
  listenIcon,
} from '~/assets/images';

const AppTabItem = ({
  label = '',
  isHide = false,
  isListen = false,
  paddingBottom = 0,
  onPress = () => {},
}) => {
  const textStyle = [
    styles.buttonText,
    isHide && styles.hideText,
    isListen && styles.listenText,
  ];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { paddingBottom },
        isHide && styles.hideButton,
        isListen && styles.listenButton,
      ]}
      accessibilityRole="button"
      onPress={onPress}
    >
      {isListen && (
        <SvgXml
          height={vs(26)}
          xml={listenIcon}
          style={styles.buttonIcon}
        />
      )}

      {isHide && (
        <SvgXml
          height={vs(26)}
          xml={hideIcon}
          style={styles.buttonIcon}
        />
      )}

      <Text style={textStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default AppTabItem;

const styles = ScaledSheet.create({
  button: {
    flex: 1,
    paddingTop: '16@vsr',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: '1@msr',
    justifyContent: 'center',
    borderTopColor: '#E5E7EB',
  },
  listenButton: {
    borderLeftWidth: '1@msr',
    borderRightWidth: '1@msr',
    borderLeftColor: '#E5E7EB',
    borderRightColor: '#E5E7EB',
    borderTopLeftRadius: '8@msr',
  },
  hideButton: {
    borderRightWidth: '1@msr',
    borderRightColor: '#E5E7EB',
    borderTopRightRadius: '8@msr',
  },
  buttonIcon: {
    marginRight: '15@s',
  },
  buttonText: {
    fontSize: '16@msr',
    lineHeight: '20@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-SemiBold',
  },
  listenText: {
    color: '#333333',
  },
  hideText: {
    color: '#DC2626',
  },
});
