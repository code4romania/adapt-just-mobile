import React, {
  useCallback,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import {
  infoIcon,
  moneyIcon,
} from '~/assets/images';
import { shortContent } from './texts';

const AboutProjectShortContent = () => {
  const renderContent1 = useCallback(() => {
    const startIndex = shortContent[0].indexOf('Ceasul Bun');
    const endIndex = startIndex + 'Ceasul Bun'.length;

    return (
      <Text style={styles.text}>
        {shortContent[0].slice(0, startIndex)}
        <Text style={styles.textBold}>
          {shortContent[0].slice(startIndex, endIndex)}
        </Text>
        {shortContent[0].slice(endIndex)}
      </Text>
    );
  }, []);

  const renderContent3 = useCallback(() => {
    const startIndex = shortContent[2].indexOf('1.324.994 €');
    const endIndex = startIndex + '1.324.994 €'.length;

    return (
      <Text style={styles.text}>
        {shortContent[2].slice(0, startIndex)}
        <Text style={styles.textBold}>
          {shortContent[2].slice(startIndex, endIndex)}
        </Text>
        {shortContent[2].slice(endIndex)}
      </Text>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SvgXml
          xml={infoIcon}
          width={ms(72)}
          height={ms(72)}
        />

        <Text style={styles.title}>
          Descriere
        </Text>
      </View>

      <Text style={styles.text}>
        {renderContent1()}.
      </Text>

      <Text style={styles.text}>
        {shortContent[1]}.
      </Text>

      <View style={styles.header}>
        <SvgXml
          width={ms(72)}
          height={ms(72)}
          xml={moneyIcon}
        />

        <Text style={styles.title}>
          Finanțare
        </Text>
      </View>

      <Text style={styles.text}>
        {renderContent3()}.
      </Text>
    </View>
  );
};

export default AboutProjectShortContent;

const styles = ScaledSheet.create({
  container: {
    marginTop: '20@vs',
    marginHorizontal: '32@s',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10@vs',
  },
  title: {
    color: '#000',
    fontSize: '20@msr',
    marginLeft: '16@s',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Bold',
  },
  text: {
    color: '#000',
    fontSize: '20@msr',
    marginBottom: '27@vs',
    letterSpacing: '0.5@s',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Regular',
  },
  textBold: {
    fontFamily: 'EncodeSans-Bold',
  },
});
