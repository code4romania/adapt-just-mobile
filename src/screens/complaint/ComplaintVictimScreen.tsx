import React, {
  useRef,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  complaintMeIcon,
  complaintOtherIcon,
} from '~/assets/images';
import useEmergency from '~/hooks/use-emergency';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormButton from '~/components/shared/buttons/FormButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Ecran principal',
  'Pentru cine ceri ajutor?',
  'Pentru mine',
  'Am eu o problemă și am nevoie de ajutor',
  'Pentru altcineva',
  'Are altcineva o problemă și vreau să îl o ajut',
  'Dacă tu ești în pericol sau altă persoană este în pericol, sună urgent la 1 1 2',
];

const ComplaintVictimScreen = ({
  navigation,
}) => {
  const complaintRef = useRef('');

  const { callEmergency } = useEmergency();
  const {
    setVictim,
    setComplaint,
    resetComplaint,
  } = useContext(ComplaintContext);

  useEffect(() => {
    const getComplaint = async () => {
      const complaint = await AsyncStorage.getItem('@complaint');

      if (!complaint) return;
      complaintRef.current = complaint;
    };

    getComplaint();
  }, []);

  const navigateType = async (victim) => {
    await setVictim(victim);

    if (victim === 'me') {
      navigation.navigate('ComplaintType');
    } else {
      let screen = 'ComplaintDisclaimer';

      if (complaintRef.current) {
        const complaint = JSON.parse(complaintRef.current);
        const { step } = complaint;
  
        if (complaint?.victim === victim) {
          if (complaint?.disclaimerShown) {
            screen = 'ComplaintData';
          }
  
          if (complaint?.dataShown) {
            screen = 'ComplaintName';
          }
  
          setComplaint(complaint);

          navigation.navigate(screen, {
            step,
            victim,
          });

          return;
        } else {
          await resetComplaint({
            victim,
            dataShown: false,
            disclaimerShown: false,
          });
        }
      }

      navigation.navigate(screen);
    }
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
            title="Pentru cine ceri ajutor?"
          />
        </View>

        <View style={styles.formContainer}>
          <FormButton
            title="Pentru mine"
            icon={complaintMeIcon}
            subtitle="Am eu o problemă și am nevoie de ajutor"
            onPress={() => navigateType('me')}
          />
          <FormButton
            icon={complaintOtherIcon}
            title="Pentru altcineva"
            subtitle="Are altcineva o problemă și vreau să îl/o ajut"
            onPress={() => navigateType('other')}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Dacă tu ești în pericol sau altă persoană este în pericol
          </Text>
          <Text
            suppressHighlighting
            style={[
              styles.infoText,
              styles.textHighlight,
            ]}
            onPress={callEmergency}
          >
            sună urgent la 112
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ComplaintVictimScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: '16@s',
  },
  titleContainer: {
    marginHorizontal: '12@s',
  },
  formContainer: {
    marginTop: '30@vs',
  },
  infoContainer: {
    marginTop: '60@vs',
    marginHorizontal: '8@s',
    justifyContent: 'center',
  },
  infoText: {
    color: '#111827',
    fontSize: '16@msr',
    lineHeight: '22@msr',
    letterSpacing: '0.5@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Medium',
  },
  textHighlight: {
    fontFamily: 'EncodeSans-Bold',
    textDecorationLine: 'underline',
  },
});
