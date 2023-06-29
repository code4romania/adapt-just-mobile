import React, {
  useContext,
} from 'react';
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

import { listenButton } from '~/assets/images';
import { HideViewContext } from '~/context/HideViewContext';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Înapoi',
  'Ce face butonul ascultă?',
  'Butonul ascultă este prezent pe fiecare ecran și îți citește textele',
  'Cititul se oprește dacă',
  'Apeși butonul ascunde (apasă aici ca să vezi ce face butonul ascunde)',
  'Ieși din aplicație',
];

const AboutListenScreen = () => {
  const { setVisible } = useContext(HideViewContext);

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
            title="Ce face butonul ascultă?"
          />
        </View>

        <View style={styles.content}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={listenButton}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Butonul <Text style={styles.textBold}>ascultă</Text> este prezent pe fiecare ecran și îți citește textele.{`\r\n\r\n`}
            </Text>
            <Text style={styles.text}>
              Cititul se oprește dacă
            </Text>

            <View style={styles.textRow}>
              <View style={styles.bullet} />
              <Text style={styles.text}>
                Apeși butonul <Text style={styles.textBold}>ascunde</Text> (apasă <Text style={styles.textUnderline} onPress={() => setVisible(true)}>aici</Text> ca să vezi ce face butonul ascunde)
              </Text>
            </View>
            <View style={styles.textRow}>
              <View style={styles.bullet} />
              <Text style={styles.text}>
                Ieși din aplicație
              </Text>
            </View>
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
  textRow: {
    marginTop: '10@vs',
    flexDirection: 'row',
    alignItems: 'center',
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
  textUnderline: {
    textDecorationLine: 'underline',
  },
  bullet: {
    width: '8@msr',
    height: '8@msr',
    borderRadius: '4@msr',
    backgroundColor: '#000',
    marginHorizontal: '10@s',
  },
});
