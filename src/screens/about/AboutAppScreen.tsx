import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import AboutAppButton from '~/components/about/AboutAppButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Ecran principal',
  'Despre aplicație',
  'Cum se folosește aplicația',
  'Despre proiect',
  'Finanțare și parteneri',
  'Termeni și condiții',
];

const AboutAppScreen = ({
  navigation,
}) => {
  const navigateHowToUseApp = () => {
    navigation.navigate('HowToUseApp');
  };

  const navigateAboutProject = () => {
    navigation.navigate('AboutProject');
  };

  const navigateFundingAndPartners = () => {
    navigation.navigate('FundingAndPartners');
  };

  const navigateTermsAndConditions = () => {

  };

  return (
    <ScreenContainer
      showHomeButton
      listenText={listenText}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleContainer}>
          <ScreenTitle
            title="Despre aplicație"
          />
        </View>

        <View style={styles.content}>
          <AboutAppButton
            title="Cum se folosește aplicația"
            onPress={navigateHowToUseApp}
          />

          <AboutAppButton
            title="Despre proiect"
            onPress={navigateAboutProject}
          />

          <AboutAppButton
            title="Finanțare și parteneri"
            onPress={navigateFundingAndPartners}
          />

          <AboutAppButton
            title="Termeni și condiții"
            onPress={navigateTermsAndConditions}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AboutAppScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  titleContainer: {
    paddingHorizontal: '38@s',
  },
  content: {
    marginTop: '40@vs',
    paddingHorizontal: '30@s',
  },
});
