import React, {
  useMemo,
  useState,
  useContext,
} from 'react';
import {
  View,
  Text,
  Alert,
  Dimensions,
} from 'react-native';
import {
  s,
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import AsyncStorage from '@react-native-async-storage/async-storage';

import style from '~/components/complaint/style';
import { NetInfoContext } from '~/context/NetInfoContext';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormStepper from '~/components/shared/form/FormStepper';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import DigitalSignature from '~/components/shared/DigitalSignature';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Pasul :step din :steps',
  'Semnează plângerea',
  'Desenează cu degetul pe ecran semnătura ta sau scrie-ți numele',
];

const { width } = Dimensions.get('window');

const signatureHeight = vs(360);
const signatureWidth = width - s(48);

const ComplaintSignatureScreen = ({
  navigation,
}) => {
  const {
    steps,
    submit,
    setSignature,
    setComplaintStep,
  } = useContext(ComplaintContext);

  const [loading, setLoading] = useState(false);
  const { isConnected } = useContext(NetInfoContext);

  const step = useMemo(() => steps - 1, [steps]);

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0].replace(':step', step).replace(':steps', steps)}`;

  }, [step, steps]);

  const handleSubmit = async () => {
    if (!isConnected) {
      setComplaintStep({
        step,
        triedSubmit: true,
      });

      Alert.alert(
        'Fără conexiune la internet'.toUpperCase(),
        'Pentru a putea trimite plângerea, trebuie fii conectat la internet. Odată ce conexiunea este restabilită, plângerea se va trimite automat.'.toUpperCase(),
        [
          {
            text: 'AM ÎNȚELES',
            style: 'cancel',
            onPress: () => navigateHome(),
          },
        ],
      );

      return;
    }

    await submitComplaint();
  };

  const submitComplaint = async () => {
    setLoading(true);

    try {
      await submit();
      await AsyncStorage.removeItem('@complaint');
      navigation.navigate('ComplaintSuccess');
    } catch (error) {
      Alert.alert(
        'Eroare'.toUpperCase(),
        'A apărut o eroare la trimiterea plângerii. Te rugăm să încerci mai târziu.'.toUpperCase(),
        [
          {
            text: 'AM ÎNȚELES',
            style: 'cancel',
          },
        ],
      );

      setLoading(false);
    }
  };

  const navigateHome = () => {
    navigation.navigate('Home');
  };

  return (
    <ScreenContainer
      listenText={lText}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <FormStepper
            step={step}
            steps={steps}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title="Semnează plângerea"
            />
            <Text style={styles.subtitle}>
              Desenează cu degetul pe ecran semnătura ta sau scrie-ți numele
            </Text>
          </View>

          <View style={styles.signature}>
            <DigitalSignature
              width={signatureWidth}
              height={signatureHeight}
              onSignature={setSignature}
            />
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <ScreenActions
          loading={loading}
          nextText="Trimite"
          onNext={handleSubmit}
        />
      </View>
    </ScreenContainer>
  );
};

export default ComplaintSignatureScreen;

const styles = ScaledSheet.create({
  ...style,
  signature: {
    marginTop: '24@vs',
    borderWidth: '2@ms',
    borderRadius: '6@msr',
    borderStyle: 'dashed',
    borderColor: '#374151',
    height: signatureHeight,
  },
});
