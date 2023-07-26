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
  stareaNatiei,
  ministerulPublic,
} from '~/assets/images';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Înapoi',
  'Implementare',
  'Centrul de Resurse Juridice',
  'În parteneriat cu',
  'Ministerul Public',
  'Dezvoltat cu sprijinul',
  'Code For Romania',
  'Finanțatori',
  'Iceland Liechtenstein Norway Grants',
  'Fondul Român de Dezvoltare Socială',
  'Partener Media',
  'Starea Nației',
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
            title="Implementare"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.info}>
            <Image
              source={crj}
              style={styles.crj}
              resizeMode="contain"
            />

            <Text style={styles.text}>
              {`Centrul de\r\nResurse Juridice`}
            </Text>
          </View>

          <Text style={[
            styles.subtitle,
            { marginTop: vs(40) }
          ]}>
            În parteneriat cu:
          </Text>

          <View style={styles.info}>
            <Image
              resizeMode="contain"
              source={ministerulPublic}
              style={styles.ministerulPublic}
            />

            <Text style={styles.text}>
              Ministerul Public
            </Text>
          </View>

          <Text style={[
            styles.subtitle,
            { marginBottom: vs(37) }
          ]}>
            Dezvoltat cu sprijinul:
          </Text>

          <View style={styles.info}>
            <Image
              source={c4r}
              style={styles.c4r}
              resizeMode="contain"
            />

            <Text style={styles.text}>
              Code For Romania
            </Text>
          </View>

          <Text style={[
            styles.subtitle,
            { marginTop: vs(45) }
          ]}>
            Finanțatori
          </Text>

          <View style={[
            styles.info,
            { marginTop: vs(24) }
          ]}>
            <Image
              source={ilnGrants}
              resizeMode="contain"
              style={styles.ilnGrants}
            />

            <Text style={[
              styles.text,
              styles.textSmall,
            ]}>
              {`Iceland\r\nLiechtenstein\r\nNorway\r\nGrants`}
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={frds}
              style={styles.frds}
              resizeMode="contain"
            />

            <Text style={[
              styles.text,
              styles.textSmall,
            ]}>
              {`Fondul Român de\r\nDezvoltare\r\nSocială`}
            </Text>
          </View>

          <Text style={[
            styles.subtitle,
            {
              marginTop: vs(32),
              marginBottom: vs(16),
            }
          ]}>
            Partener Media:
          </Text>

          <View style={styles.info}>
            <Image
              resizeMode="contain"
              source={stareaNatiei}
              style={styles.stareaNatiei}
            />

            <Text style={[
              styles.text,
              styles.textSmall,
            ]}>
              {`Starea Nației`}
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
  subtitle: {
    color: '#111827',
    fontSize: '16@msr',
    letterSpacing: '0.4@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crj: {
    width: '134@s',
    height: '94@vs',
    marginRight: '40@s',
  },
  ministerulPublic: {
    width: '150@s',
    height: '150@vs',
    marginRight: '36@s',
  },
  c4r: {
    width: '120@s',
    height: '37@vs',
    marginRight: '30@s',
  },
  ilnGrants: {
    width: '93@s',
    height: '93@vs',
    marginRight: '24@s',
  },
  frds: {
    width: '93@s',
    height: '94@vs',
    marginRight: '24@s',
  },
  stareaNatiei: {
    width: '74@s',
    height: '72@vs',
    marginRight: '42@s',
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
  textSmall: {
    fontSize: '12@msr',
    lineHeight: '17@msr',
  },
});
