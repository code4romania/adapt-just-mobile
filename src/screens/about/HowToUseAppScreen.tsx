import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import AboutAppButton from '~/components/about/AboutAppButton';
import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Înapoi',
  'Cum se folosește aplicația?',
  'Ce face butonul ascultă?',
  'Ce face butonul ascunde?',
  'Cum fac o plângere?',
  'Cum caut ajutor?',
  'Ce găsesc la informații?',
];

const HowToUseAppScreen = ({
  navigation,
}) => {
  const navigateAboutListen = () => {
    navigation.navigate('AboutListen');
  };

  const navigateAboutHide = () => {
    navigation.navigate('AboutHide');
  };

  const navigateAboutComplaint = () => {
    navigation.navigate('AboutComplaint');
  };

  const navigateAboutHelp = () => {
    navigation.navigate('AboutHelp');
  };

  const navigateAboutInformation = () => {
    navigation.navigate('AboutInformation');
  };

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
            title="Cum se folosește aplicația"
          />
        </View>

        <View style={styles.content}>
          <AboutAppButton
            title="Ce face butonul ascultă?"
            onPress={navigateAboutListen}
          />

          <AboutAppButton
            title="Ce face butonul ascunde?"
            onPress={navigateAboutHide}
          />

          <AboutAppButton
            title="Cum fac o plângere?"
            onPress={navigateAboutComplaint}
          />

          <AboutAppButton
            title="Cum caut ajutor?"
            onPress={navigateAboutHelp}
          />

          <AboutAppButton
            title="Ce găsesc la informații?"
            onPress={navigateAboutInformation}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HowToUseAppScreen;

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
    paddingHorizontal: '30@s',
  },
});
