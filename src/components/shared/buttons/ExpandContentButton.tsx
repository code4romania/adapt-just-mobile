import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { chevronDownIcon } from '~/assets/images';

const ExpandContentButton = ({
  children: content,
  expanded = false,
  onPress = () => {},
}) => {
  const showContent = !!content && expanded;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <SvgXml
          width={ms(16)}
          height={ms(16)}
          xml={chevronDownIcon}
          style={expanded && styles.iconExpanded}
        />

        <Text
          numberOfLines={1}
          style={styles.buttonText}
        >
          Citește textul în format accesibilizat
        </Text>
      </TouchableOpacity>

      {showContent && (
        <>
          {content}
        </>
      )}
    </View>
  );
};

export default ExpandContentButton;

const styles = ScaledSheet.create({
  container: {
    marginTop: '20@vs',
    borderBottomWidth: '1@msr',
    borderBottomColor: '#1F2937',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: '1@msr',
    paddingVertical: '3@vs',
    paddingHorizontal: '5@s',
    borderTopColor: '#1F2937',
  },
  buttonText: {
    color: '#1F2937',
    marginLeft: '8@s',
    fontSize: '14@msr',
    lineHeight: '32@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-SemiBold',
  },
  iconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
});
