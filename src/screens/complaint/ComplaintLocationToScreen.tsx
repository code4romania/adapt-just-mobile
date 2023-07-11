import React, {
  useMemo,
  useEffect,
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
import FormRadioButton from '~/components/shared/buttons/FormRadioButton';
import ComplaintLocationButton from '~/components/complaint/ComplaintLocationButton';

const listenText = [
  'Pasul 3 din ',
  'Unde vrei să te muți ?',
  'Alege numele localității și al spitalului sau al centrului în care vrei să te muți',
  'Caută o locație',
  'Nu știu',
  'Dacă nu poți să scrii, ține apăsat pe microfon ca să vorbești.',
  'Înapoi',
  'Continuă',
];

const ComplaintLocationToScreen = ({
  route,
  navigation,
}) => {
  const {
    steps,
    locationTo,
    locationToType,
    setLocationTo,
    setLocationToType,
    setComplaintStep,
  } = useContext(ComplaintContext);

  const isNone = locationToType === 'none';

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0]}${steps}`;

    if (locationTo) {
      text[3] = `${locationTo.name}`;
    }

    return text;
  }, [locationTo]);

  useEffect(() => {
    if (route?.params?.step > 3) {
      navigation.navigate('ComplaintMovingReason');
    }
  }, [route?.params]);

  const handleRecording = (result = '') => {
    const name = result.toUpperCase().trim();

    setLocationTo({
      name,
    });
  };

  const handleNext = () => {
    setComplaintStep({ step: 4 });
    navigation.navigate('ComplaintMovingReason');
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
            step={3}
            steps={steps}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title="Unde vrei să te muți?"
            />
            <Text style={styles.subtitle}>
              Alege numele localității și al spitalului sau al centrului în care vrei să te muți
            </Text>
          </View>

          <View style={styles.locationContainer}>
            <ComplaintLocationButton
              location={locationTo}
              screen="ComplaintLocationTo"
            />

            <View style={styles.radioContainer}>
              <FormRadioButton
                checked={isNone}
                title="Nu știu"
                onPress={() => setLocationToType('none')}
              />
            </View>
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

export default ComplaintLocationToScreen;

const styles = ScaledSheet.create({
  ...style,
  locationContainer: {
    marginTop: '36@vs',
    marginBottom: '32@vs',
    marginHorizontal: '-8@s',
  },
  radioContainer: {
    marginTop: '16@vs',
  },
});
