import React, {
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import RadioCheck from '../RadioCheck';

const FormRadioButton = ({
  title = '',
  subtitle = '',
  checked = false,
  onPress = () => {},
}) => {
  const [pressed, setPressed] = useState(false);

  const containerStyle = [
    styles.container,
    pressed && styles.pressed,
    checked && styles.checked,
  ];

  return (
    <TouchableHighlight
      disabled={checked}
      style={containerStyle}
      underlayColor={'#FFFBEB'}
      onPress={onPress}
      onShowUnderlay={() => setPressed(true)}
      onHideUnderlay={() => setPressed(false)}
    >
      <>
        <View style={styles.content}>
          <View style={styles.info}>
            {!!title && (
              <Text
                numberOfLines={2}
                style={styles.title}
              >
                {title}
              </Text>
            )}
            {!!subtitle && (
              <Text
                numberOfLines={2}
                style={styles.subtitle}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        <RadioCheck checked={checked} />
      </>
    </TouchableHighlight>
  );
};

export default FormRadioButton;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '8@vs',
    borderRadius: '6@msr',
    borderColor: '#E5E7EB',
    paddingVertical: '17@vs',
    paddingHorizontal: '17@s',
    backgroundColor: '#FFFFFF',
  },
  checked: {
    borderColor: '#FDE68A',
    backgroundColor: '#FFFBEB',
  },
  pressed: {
    borderColor: '#FDE68A',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#111827',
    fontSize: '14@msr',
    lineHeight: '20@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  subtitle: {
    color: '#374151',
    fontSize: '14@msr',
    lineHeight: '20@msr',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Regular',
  },
});
