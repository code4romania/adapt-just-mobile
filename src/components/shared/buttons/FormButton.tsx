import React, {
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import ArrowRightIcon from '~/components/shared/icons/ArrowRightIcon';

const FormButton = ({
  title = '',
  icon = null,
  subtitle = '',
  checked = false,
  onPress = () => {},
}) => {
  const [pressed, setPressed] = useState(false);

  const containerStyle = [
    styles.container,
    pressed && styles.pressed,
    checked && styles.containerChecked,
  ];

  return (
    <TouchableHighlight
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
              height={vs(60)}
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

            {!!subtitle && (
              <Text
                numberOfLines={3}
                style={styles.subtitle}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        <ArrowRightIcon />
      </>
    </TouchableHighlight>
  );
};

export default FormButton;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '12@vs',
    borderRadius: '6@msr',
    borderColor: '#E5E7EB',
    paddingVertical: '17@vs',
    paddingHorizontal: '16@s',
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
    marginBottom: '6@vs',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-SemiBold',
  },
  subtitle: {
    color: '#4B5563',
    fontSize: '14@msr',
    lineHeight: '20@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-SemiBold',
  },
});
