import React, {
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import {
  s,
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { checkIcon } from '~/assets/images';

const FormCheckButton = ({
  title = '',
  icon = null,
  checked = false,
  disabled = false,
  onPress = () => {},
}) => {
  const [pressed, setPressed] = useState(false);

  const containerStyle = [
    styles.container,
    pressed && styles.pressed,
    checked && styles.containerChecked,
  ];

  const checkStyle = [
    styles.checkContainer,
    checked && styles.checked,
  ];

  return (
    <TouchableHighlight
      disabled={disabled}
      style={containerStyle}
      underlayColor={'#FFFBEB'}
      onPress={onPress}
      onShowUnderlay={() => setPressed(true)}
      onHideUnderlay={() => setPressed(false)}
    >
      <>
        <View style={styles.content}>
          {!!icon && (
            <SvgXml
              xml={icon}
              width={s(40)}
              height={vs(40)}
            />
          )}

          <View style={styles.info}>
            {!!title && (
              <Text
                numberOfLines={2}
                style={styles.title}
              >
                {title}
              </Text>
            )}
          </View>
        </View>

        <View style={checkStyle}>
          {checked && (
            <SvgXml
              xml={checkIcon}
              height={vs(20)}
            />
          )}
        </View>
      </>
    </TouchableHighlight>
  );
};

export default FormCheckButton;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '8@vs',
    borderRadius: '6@msr',
    borderColor: '#E5E7EB',
    paddingVertical: '19@vs',
    paddingHorizontal: '20@s',
    backgroundColor: '#FFFFFF',
  },
  containerChecked: {
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
    marginLeft: '13@s',
  },
  title: {
    color: '#111827',
    fontSize: '16@msr',
    lineHeight: '20@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-SemiBold',
  },
  checkContainer: {
    borderWidth: 1,
    width: '16@msr',
    height: '16@msr',
    alignItems: 'center',
    borderRadius: '4@msr',
    borderColor: '#D1D5DB',
    justifyContent: 'center',
  },
  checked: {
    borderColor: '#D97706',
    backgroundColor: '#D97706',
  },
});
