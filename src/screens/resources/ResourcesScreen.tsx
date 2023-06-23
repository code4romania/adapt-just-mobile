import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import {
  lawyerIcon,
  phoneNumberIcon,
  organisationIcon,
} from '~/assets/images';

import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ResourceButton from '~/components/resources/ResourceButton';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Ecran principal',
  'Resurse de sprijin',
  'Numere de telefon',
  'Organizații',
  'Sfaturi Avocat',
];

const ResourcesScreen = ({
  navigation,
}) => {
  const navigatePhoneNumbers = () => {
    navigation.navigate('ResourcesPhoneNumbers');
  };

  const navigateOrganisations = () => {
    navigation.navigate('ResourcesOrganisations');
  };

  const navigateLawyers = () => {
    navigation.navigate('ResourcesLawyers');
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
            title="Resurse de sprijin"
          />
        </View>

        <View style={styles.content}>
          <ResourceButton
            icon={phoneNumberIcon}
            title="Numere de telefon"
            onPress={navigatePhoneNumbers}
          />

          <ResourceButton
            title="Organizații"
            icon={organisationIcon}
            onPress={navigateOrganisations}
          />

          <ResourceButton
            icon={lawyerIcon}
            title="Sfaturi Avocat"
            onPress={navigateLawyers}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ResourcesScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  titleContainer: {
    paddingHorizontal: '24@s',
  },
  content: {
    marginTop: '40@vs',
    paddingHorizontal: '30@s',
  },
});
