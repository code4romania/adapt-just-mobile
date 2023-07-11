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

const listenText = [
  'Pasul 4 din ',
  'De ce vrei să te muți ?',
  'Scrie în casetă de ce vrei să te muți',
  'Scrie aici',
  'Dacă nu poți să scrii, ține apăsat pe microfon ca să vorbești.',
  'Înapoi',
  'Continuă',
];

const ComplaintMovingReasonScreen = ({
  route,
  navigation,
}) => {
  const {
    steps,
    reason,
    setReason,
    setComplaintStep,
  } = useContext(ComplaintContext);

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0]}${steps}`;

    if (reason) {
      text[3] = `${reason}`;
    }

    return text;
  }, [reason]);

  useEffect(() => {
    if (route?.params?.step > 4) {
      navigation.navigate('ComplaintPreview');
    }
  }, [route?.params]);

  const handleRecording = (result = '') => {
    result = result.toUpperCase().trim();
    
    setReason(result);
  };

  const handleNext = () => {
    setComplaintStep({ step: 5 });
    navigation.navigate('ComplaintPreview');
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
            step={4}
            steps={steps}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title="De ce vrei să te muți?"
            />
            <Text style={styles.subtitle}>
              Scrie în casetă de ce vrei să te muți
            </Text>
          </View>

          <View style={styles.input}>
            <FormTextInput
              value={reason}
              inputProps={{
                multiline: true,
                numberOfLines: 5,
              }}
              showClearButton={false}
              placeholder="SCRIE AICI...."
              onChange={setReason}
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

export default ComplaintMovingReasonScreen;

const styles = ScaledSheet.create({
  ...style,
  input: {
    marginTop: '48@vs',
    marginBottom: '32@vs',
  },
});
