import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import ArrowRightIcon from '~/components/shared/icons/ArrowRightIcon';

const AboutAppButton = ({
  title = '',
  onPress = () => {},
}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={'#FBBF24'}
      onPress={onPress}
    >
      <>
        <View style={styles.content}>
          {!!title && (
            <Text
              numberOfLines={2}
              style={styles.title}
            >
              {title}
            </Text>
          )}
        </View>

        <ArrowRightIcon />
      </>
    </TouchableHighlight>
  );
};

export default AboutAppButton;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '20@vs',
    borderRadius: '8@msr',
    borderColor: '#FBBF24',
    paddingVertical: '24@vs',
    paddingHorizontal: '28@s',
    backgroundColor: '#FFFFFF',

    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowColor: '#000000',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#111827',
    fontSize: '15@msr',
    lineHeight: '18@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Bold',
  },
});
