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
import FormTextInput from '~/components/shared/form/FormTextInput';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const currentStep = 1;

const listenText = [
  `Pasul ${currentStep} din `,
  'Cum te cheamă ?',
  'Scrie numele mic și numele de familie',
  'Nume și prenume',
  'Dacă nu poți să scrii, ține apăsat pe microfon ca să vorbești.',
  'Înapoi',
  'Continuă',
];

const ComplaintNameScreen = ({
  route,
  navigation,
}) => {
  const {
    name,
    steps,
    setName,
    setComplaintStep,
  } = useContext(ComplaintContext);

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0]}${steps}`;

    if (name) {
      text[3] = `${name}.`;
    }

    return text;
  }, [name]);

  useEffect(() => {
    if (
      route?.params?.step && (
        route?.params?.type ||
        route?.params?.victim
    )) {
      goNextStep(route?.params?.step);
    }
  }, [route?.params]);

  const goNextStep = (step) => {
    if (step > currentStep) {
      navigation.navigate('ComplaintCNP', { step });
    }
  };

  const handleRecording = (result = '') => {
    result = result.toUpperCase().trim();
    setName(`${result}`);
  };

  const handleNext = () => {
    setComplaintStep({ step: currentStep + 1 });
    navigation.navigate('ComplaintCNP');
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
            steps={steps}
            step={currentStep}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title="Cum te cheamă?"
            />
            <Text style={styles.subtitle}>
              Scrie numele mic și numele de familie
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <FormTextInput
              value={name}
              inputProps={{
                autoFocus: true,
              }}
              placeholder="Nume și prenume"
              onChange={setName}
            />
          </View>

          <FormRecording
            onRecording={handleRecording}
          />
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <ScreenActions
          nextEnabled={!!name}
          onNext={handleNext}
        />
      </View>
    </ScreenContainer>
  );
};

export default ComplaintNameScreen;

const styles = ScaledSheet.create({
  ...style,
  inputContainer: {
    marginTop: '40@vs',
    marginBottom: '70@vs',
    marginHorizontal: '-8@s',
  },
});
