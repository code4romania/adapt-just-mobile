import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import { content } from './texts';

const AboutProjectContent = () => {
  return (
    <View>
      <Text style={styles.text}>
        {content[0]}.
      </Text>
      <Text style={styles.text}>
        {content[1]}.
      </Text>
      <Text style={styles.text}>
        {content[2]}. {content[3]}. {content[4]}. {content[5]}.
      </Text>
    </View>
  );
};

export default AboutProjectContent;

const styles = ScaledSheet.create({
  text: {
    color: '#000',
    fontSize: '16@msr',
    lineHeight: '21@msr',
    fontFamily: 'EncodeSans-Regular'
  },
});
