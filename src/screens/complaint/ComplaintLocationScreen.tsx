import React, {
  useMemo,
  useContext,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import style from '~/components/complaint/style';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormStepper from '~/components/shared/form/FormStepper';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import FormRecording from '~/components/shared/form/FormRecording';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';
import ComplaintLocationButton from '~/components/complaint/ComplaintLocationButton';

const listenText = [
  'Pasul 2 din ',
  'Unde te afli acum ?',
  'Alege numele localității și al spitalului sau al centrului',
  'Caută o locație',
  'Dacă nu poți să scrii, ține apăsat pe microfon ca să vorbești.',
  'Înapoi',
  'Continuă',
];

const ComplaintLocationScreen = ({
  navigation,
}) => {
  const {
    type,
    steps,
    victim,
    location,
    locationName,
    setLocation,
  } = useContext(ComplaintContext);

  const title = useMemo(() => {
    let text = listenText[1];

    if (victim === 'other') {
      text = 'Unde s-a petrecut incidentul?';
    }

    return text;
  }, [victim]);

  const lText = useMemo(() => {
    const text = [...listenText];

    text[0] = `${text[0]}${steps}`;
    text[1] = title;

    if (location) {
      text[3] = `${locationName}`;
    }

    return text;
  }, [title, location]);

  const handleRecording = (result = '') => {
    const name = result.toUpperCase().trim();

    setLocation({
      name,
    });
  };

  const handleNext = () => {
    if (!type) {
      navigation.navigate('ComplaintOtherReason'); 
    } else {
      if (type === 'hurt') {
        navigation.navigate('ComplaintDetails');
      }
      if (type === 'move') {
        navigation.navigate('ComplaintLocationTo');
      }
      if (type === 'evaluation') {
        navigation.navigate('ComplaintPreview');
      }
    }
  };

  return (
    <ScreenContainer
      listenText={lText}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.content}>
          <FormStepper
            step={2}
            steps={steps}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title={title}
            />
            <Text style={styles.subtitle}>
              Alege numele localității și al spitalului sau al centrului
            </Text>
          </View>

          <View style={styles.locationContainer}>
            <ComplaintLocationButton
              location={location}
            />
          </View>

          <FormRecording
            onRecording={handleRecording}
          />
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <ScreenActions
          onNext={handleNext}
        />
      </View>
    </ScreenContainer>
  );
};

export default ComplaintLocationScreen;

const styles = ScaledSheet.create({
  ...style,
  locationContainer: {
    marginTop: '28@vs',
    marginBottom: '32@vs',
    marginHorizontal: '-8@s',
  },
});
