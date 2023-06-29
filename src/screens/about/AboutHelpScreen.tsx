import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {
  s,
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import {
  lawyerIcon,
  phoneNumberIcon,
  organisationIcon,
  askHelpResources,
} from '~/assets/images';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Înapoi',
  'Cum caut ajutor?',
  'Dacă vrei să cauți ajutor pe la alte organizații, mergi în resurse de sprijin din meniul principal',
  'În acest modul vei găsi:',
  'Numere de telefon',
  'Informații despre organizații',
  'Sfaturi juridice de la avocați',
];

const AboutHelpScreen = () => {
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
            title="Cum caut ajutor?"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>
            Dacă vrei să cauți ajutor pe la alte organizații, mergi în <Text style={styles.textBold}>resurse de sprijin</Text> din meniul principal.
          </Text>

          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={askHelpResources}
            />
          </View>

          <Text style={styles.text}>
            În acest modul vei găsi:
          </Text>

          <View style={styles.row}>
            <View style={styles.icon}>
              <SvgXml
                width={s(50)}
                height={vs(50)}
                xml={phoneNumberIcon}
              />
            </View>

            <Text style={styles.text}>
              Numere de telefon
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.icon}>
              <SvgXml
                width={s(62)}
                height={vs(50)}
                xml={organisationIcon}
              />
            </View>

            <Text style={styles.text}>
              Informații despre organizații
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.icon}>
              <SvgXml
                width={s(54)}
                height={vs(54)}
                xml={lawyerIcon}
              />
            </View>

            <Text style={styles.text}>
              Sfaturi juridice de la avocați
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AboutHelpScreen;

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
    paddingHorizontal: '35@s',
  },
  text: {
    flex: 1,
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
  imageContainer: {
    marginTop: '28@vs',
    alignItems: 'center',
    marginBottom: '32@vs',
  },
  row: {
    marginTop: '25@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: '90@s',
  },
});
