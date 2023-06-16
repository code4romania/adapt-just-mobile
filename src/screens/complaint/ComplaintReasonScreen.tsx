import React, {
  useMemo,
  useState,
  useContext,
} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import style from '~/components/complaint/style';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormStepper from '~/components/shared/form/FormStepper';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import FormTextInput from '~/components/shared/form/FormTextInput';
import FormRecording from '~/components/shared/form/FormRecording';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Pasul 3 din ',
  'Ai selectat altceva',
  'Scrie aici ce altceva s-a întâmplat',
  'Dacă nu poți să scrii, ține apăsat pe microfon ca să vorbești.',
  'Înapoi',
  'Continuă',
];

const ComplaintReasonScreen = ({
  navigation,
}) => {
  const [reason, setReason] = useState('');

  const { steps } = useContext(ComplaintContext);

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0]}${steps}`;

    if (reason) {
      text[2] = `${reason}`;
    }

    return text;
  }, [reason]);

  const handleRecording = (result = '') => {
    result = result.toUpperCase().trim();
    setReason(result);
  };

  const handleNext = () => {
    navigation.navigate('ComplaintDetails', { reason });
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
              title="Ai selectat altceva"
            />
          </View>

          <View style={styles.input}>
            <FormTextInput
              value={reason}
              inputProps={{
                multiline: true,
                numberOfLines: 5,
              }}
              showClearButton={false}
              placeholder="SCRIE AICI CE ALTCEVA S-A ÎNTÂMPLAT...."
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

export default ComplaintReasonScreen;

const styles = ScaledSheet.create({
  ...style,
  input: {
    marginTop: '24@vs',
    marginBottom: '32@vs',
  },
});
