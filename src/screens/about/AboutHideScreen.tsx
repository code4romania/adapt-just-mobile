import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import {
  hideBg,
  hideButton,
} from '~/assets/images';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Înapoi',
  'Ce face butonul ascunde?',
  'Butonul ascunde este prezent pe fiecare ecran și îți ascunde ce faci dacă îl apeși',
  'Dacă apeși ascunde, pe ecran va apărea o imagine cu un ceas',
  'Ca să revii unde erai, apasă pe ceasul din imagine',
];

const AboutListenScreen = () => {
  return (
    <ScreenContainer
      listenText={listenText}
    >
      <View style={styles.buttonContainer}>
        <HomeButton
          screenName="Înapoi"
          screen="HowToUseApp"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleContainer}>
          <ScreenTitle
            marginTop={vs(25)}
            title="Ce face butonul ascunde?"
          />
        </View>

        <View style={styles.content}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={hideButton}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Butonul <Text style={styles.textBold}>ascunde</Text> este prezent pe fiecare ecran și îți ascunde ce faci dacă îl apeși.{`\r\n\r\n`}
            </Text>
            <Text style={styles.text}>
              Dacă apeși <Text style={styles.textBold}>ascunde</Text>, pe ecran va apărea o imagine cu <Text style={styles.textBold}>un ceas</Text>. Ca să revii unde erai, apasă pe ceasul din imagine.
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Image
              source={hideBg}
              resizeMode="contain"
              style={styles.bgImage}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AboutListenScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '20@vs',
  },
  buttonContainer: {
    marginTop: '35@vs',
    flexDirection: 'row',
    paddingBottom: '5@vs',
    marginHorizontal: '30@s',
  },
  titleContainer: {
    paddingHorizontal: '38@s',
  },
  content: {
    marginTop: '40@vs',
    paddingHorizontal: '35@s',
  },
  image: {
    width: '140@s',
  },
  textContainer: {
    marginTop: '30@vs',
  },
  text: {
    color: '#000',
    fontSize: '20@msr',
    lineHeight: '26@msr',
    letterSpacing: '0.6@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Regular',
  },
  textBold: {
    fontFamily: 'EncodeSans-Bold',
  },
  bgImage: {
    marginTop: '35@vs',
  },
});
