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

import { askHelpInformation } from '~/assets/images';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Înapoi',
  'Ce găsesc la informații?',
  'Dacă vrei să înțelegi mai bine diferitele tipuri de abuz sau despre situații cu care te poți confrunta, citește articole din această secțiune',
];

const AboutInformationScreen = () => {
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
            title="Ce găsesc la informații?"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>
            Dacă vrei să înțelegi mai bine diferitele tipuri de abuz sau despre situații cu care te poți confrunta, citește articole din această secțiune
          </Text>

          <Image
            resizeMode="contain"
            source={askHelpInformation}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AboutInformationScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '40@vs',
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
    paddingHorizontal: '30@s',
  },
  text: {
    flex: 1,
    color: '#000',
    fontSize: '20@msr',
    lineHeight: '26@msr',
    marginBottom: '25@vs',
    letterSpacing: '0.6@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Regular',
  },
});
