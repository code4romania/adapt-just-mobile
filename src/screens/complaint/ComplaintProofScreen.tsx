import React, {
  useMemo,
  useContext,
} from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import style from '~/components/complaint/style';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormStepper from '~/components/shared/form/FormStepper';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';
import FormRadioButton from '~/components/shared/buttons/FormRadioButton';

const listenText = [
  'Pasul 4 din ',
  'Ai dovezi ?',
  'Dovezile pot fi orice poză, videoclip sau înregistrare',
  'Da și le pot atașa acum',
  'Pot atașa acum dovezile',
  'Da și le pot oferi la nevoie',
  'Pot oferi dovezile dacă îmi vor fi cerute mai târziu',
  'Nu am dovezi',
  'Înapoi',
  'Continuă',
];

const ComplaintProofScreen = ({
  navigation,
}) => {
  const {
    steps,
    proofType,
    setProofType,
   } = useContext(ComplaintContext);

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0]}${steps}`;
    return text;
  }, []);

  const handleNext = () => {
    if (proofType === 'yes') {
      navigation.navigate('ComplaintUploads');
    } else {
      navigation.navigate('ComplaintPreview');
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
            step={4}
            steps={steps}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title="Ai dovezi?"
            />
            <Text style={styles.subtitle}>
              Dovezile pot fi orice poză, videoclip sau înregistrare
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            <FormRadioButton
              checked={proofType === 'yes'}
              title="Da și le pot atașa acum"
              subtitle="Pot atașa acum dovezile"
              onPress={() => setProofType('yes')}
            />
            <FormRadioButton
              checked={proofType === 'later'}
              title="Da și le pot oferi la nevoie"
              subtitle="Pot oferi dovezile dacă îmi vor fi cerute mai târziu"
              onPress={() => setProofType('later')}
            />
            <FormRadioButton
              title="Nu am dovezi"
              checked={proofType === 'no'}
              onPress={() => setProofType('no')}
            />
          </View>
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

export default ComplaintProofScreen;

const styles = ScaledSheet.create({
  ...style,
  optionsContainer: {
    marginTop: '26@vs',
  },
});
