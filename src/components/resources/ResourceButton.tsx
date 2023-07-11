import React from 'react';
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

const ResourceButton = ({
  title = '',
  icon = null,
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
          {!!icon && (
            <View style={styles.icon}>
              <SvgXml
                xml={icon}
                width={vs(30)}
                height={vs(30)}
              />
            </View>
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

        <ArrowRightIcon />
      </>
    </TouchableHighlight>
  );
};

export default ResourceButton;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '20@vs',
    borderRadius: '8@msr',
    borderColor: '#FBBF24',
    paddingVertical: '18@vs',
    paddingHorizontal: '25@s',
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
  icon: {
    width: '32@s',
  },
  info: {
    flex: 1,
    marginLeft: '22@s',
    marginRight: '5@s',
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
