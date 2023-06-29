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
  c4r,
  crj,
  frds,
  ilnGrants,
  ministerulPublic,
} from '~/assets/images';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Înapoi',
  'Finanțare și parteneri',
  'Finanțatori',
  'Iceland Liechtenstein Norway Grants',
  'Fondul Român de Dezvoltare Socială',
  'Proiect derulat de',
  'Centrul de Resurse Juridice',
  'În parteneriat cu',
  'Ministerul Public',
  'Dezvoltat cu sprijinul',
  'Code For Romania',
];

const FundingAndPartnersScreen = () => {
  return (
    <ScreenContainer
      listenText={listenText}
    >
      <View style={styles.buttonContainer}>
        <HomeButton
          screen="AboutApp"
          screenName="Înapoi"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleContainer}>
          <ScreenTitle
            marginTop={vs(25)}
            title="Finanțare și parteneri"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            Finanțatori
          </Text>

          <View style={styles.info}>
            <Image
              source={ilnGrants}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.text}>
              {`Iceland\r\nLiechtenstein\r\nNorway Grants`}
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={frds}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.text}>
              {`Fondul Român de\r\nDezvoltare Socială`}
            </Text>
          </View>

          <Text style={[
            styles.title,
            styles.sectionTitle,
          ]}>
            Proiect derulat de:
          </Text>

          <View style={styles.info}>
            <Image
              source={crj}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.text}>
              {`Centrul de\r\nResurse Juridice`}
            </Text>
          </View>

          <Text style={styles.subtitle}>
            În parteneriat cu:
          </Text>

          <View style={styles.info}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={ministerulPublic}
            />

            <Text style={styles.text}>
              Ministerul Public
            </Text>
          </View>

          <Text style={styles.subtitle}>
            Dezvoltat cu sprijinul:
          </Text>

          <View style={[
            styles.info,
            styles.c4r,
          ]}>
            <Image
              source={c4r}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.text}>
              Code For Romania
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default FundingAndPartnersScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '30@vs',
  },
  buttonContainer: {
    marginTop: '35@vs',
    flexDirection: 'row',
    paddingBottom: '5@vs',
    marginHorizontal: '30@s',
  },
  titleContainer: {
    paddingLeft: '30@s',
    paddingRight: '20@s',
  },
  content: {
    marginTop: '40@vs',
    paddingHorizontal: '30@s',
  },
  title: {
    color: '#111827',
    fontSize: '20@msr',
    letterSpacing: '0.4@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  sectionTitle: {
    marginTop: '32@vs',
    marginBottom: '27@vs',
  },
  subtitle: {
    color: '#111827',
    marginTop: '32@vs',
    fontSize: '16@msr',
    letterSpacing: '0.4@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  c4r: {
    marginTop: '36@vs',
  },
  image: {
    flex: 1,
    width: '120@s',
  },
  text: {
    flex: 1,
    color: '#000',
    fontSize: '15@msr',
    lineHeight: '21@msr',
    letterSpacing: '0.3@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Regular',
  },
});
