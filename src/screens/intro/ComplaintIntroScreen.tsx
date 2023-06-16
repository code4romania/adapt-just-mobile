import React, {
  useContext,
} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import { intro2Icon } from '~/assets/images';
import { IntroContext } from '~/context/IntroContext';

import SkipButton from '~/components/intro/SkipButton';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Treci peste intro',
  'Cere ajutor',
  'Aplicația te ajută să faci o plângere la autorități sau o poți folosi ca să găsești sprijin',
  'Înapoi',
  'Continuă',
];

const ComplaintIntroScreen = () => {
  const { handleIntro } = useContext(IntroContext);

  const handleNext = async () => {
    await handleIntro();
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
            Cere ajutor
          </Text>

          <View style={styles.info}>
            <Text style={styles.infoText}>
              Aplicația te ajută să faci o plângere la autorități sau o poți folosi ca să găsești sprijin
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={intro2Icon}
              resizeMode="contain"
              style={styles.image}
            />
          </View>

          <ScreenActions
            onNext={handleNext}
          />
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

export default ComplaintIntroScreen;

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
    marginTop: '70@vs',
    minHeight: '320@vs',
    alignItems: 'center',
  },
  image: {
    height: '200@vs',
  },
});
