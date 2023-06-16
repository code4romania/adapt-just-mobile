import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import { intro1Icon } from '~/assets/images';

import SkipButton from '~/components/intro/SkipButton';
import NextButton from '~/components/shared/buttons/NextButton';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Treci peste intro',
  'Ascunde aplicația',
  'Dacă apeși butonul ASCUNDE, pe ecran o să apară o pagină cu un ceas. Nimeni nu o să știe ce făceai înainte și dacă apeși pe ceas poți reveni',
  'Continuă',
];

const HideIntroScreen = ({
  navigation,
}) => {
  const handleNext = () => {
    navigation.navigate('ComplaintIntro');
  };

  return (
    <ScreenContainer
      listenText={listenText}
    >
      <View style={styles.container}>
        <View style={styles.skip}>
          <SkipButton />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.title}>
            Ascunde aplicația
          </Text>

          <View style={styles.info}>
            <Text style={styles.infoText}>
              Dacă apeși butonul <Text style={{ color: '#F59E0B', fontWeight: 'bold' }}>ASCUNDE</Text>, pe ecran o să apară o pagină cu un ceas. Nimeni nu o să știe ce făceai înainte și dacă apeși pe ceas poți reveni
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={intro1Icon}
              resizeMode="contain"
              style={styles.image}
            />
          </View>

          <View style={styles.actions}>
            <NextButton
              onPress={handleNext}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

export default HideIntroScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: '45@vs',
    paddingHorizontal: '30@s',
  },
  skip: {
    alignItems: 'flex-end',
  },
  content: {
    flexGrow: 1,
    marginTop: '30@vs',
    paddingBottom: '40@vs',
  },
  title: {
    color: '#111827',
    fontSize: '24@msr',
    lineHeight: '30@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  info: {
    marginTop: '16@vs',
  },
  infoText: {
    color: '#111827',
    fontSize: '16@msr',
    lineHeight: '24@msr',
    letterSpacing: '0.5@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  imageContainer: {
    marginTop: '32@vs',
    minHeight: '320@vs',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,

    // Android
    elevation: 5
  },
  image: {},
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
