import React, {
  useMemo,
  useContext,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { alertIcon } from '~/assets/images';
import { ComplaintContext } from '~/context/ComplaintContext';

import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Ecran principal',
  'Atenție!',
  'Înainte de a completa plângerea, este important să știi că informațiile pe care le vei introduce aici vor fi transmise către ',
  'Doar autoritățile vor ști cine ești și ce le spui.',
  'Dacă ai întrebări sau ești îngrijorat, cere ajutorul cuiva de încredere.',
  'Ești de acord să continui?',
  'înapoi',
  'Continuă',
];

const ComplaintDisclaimerScreen = ({
  navigation,
}) => {
  const {
    agenciesText,
    setComplaintStep,
  } = useContext(ComplaintContext);

  const lText = useMemo(() => {
    const text = [...listenText];
    text[2] = `${text[2]} ${agenciesText}`;

    return text;
  }, [agenciesText]);
    

  const handleNext = () => {
    setComplaintStep({
      step: 1,
      disclaimerShown: true,
    });

    navigation.navigate('ComplaintData');
  };

  return (
    <ScreenContainer
      showHomeButton
      listenText={lText}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleContainer}>
          <SvgXml
            xml={alertIcon}
            height={vs(35)}
            style={styles.icon}
          />
          <Text style={styles.title}>
            Atenție!
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>
            Înainte de a completa plângerea, este important să știi că informațiile pe care le vei introduce aici vor fi transmise către <Text style={styles.textBold}>{agenciesText}</Text> Doar autoritățile vor ști cine ești și ce le spui.{`\r\n`}{`\r\n`}

            Dacă ai întrebări sau ești îngrijorat, cere ajutorul cuiva de încredere.
          </Text>
        </View>

        <Text style={styles.askText}>
          Ești de acord să continui?
        </Text>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <ScreenActions onNext={handleNext} />
      </View>
    </ScreenContainer>
  );
};

export default ComplaintDisclaimerScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '30@vs',
    paddingHorizontal: '24@s',
  },
  titleContainer: {
    marginTop: '25@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10@s',
  },
  title: {
    color: '#070821',
    fontSize: '36@msr',
    letterSpacing: '0.6@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  content: {
    marginTop: '12@vs',
    marginBottom: '24@vs',
  },
  text: {
    color: '#111827',
    fontSize: '17@msr',
    lineHeight: '22@msr',
    letterSpacing: '0.3@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Medium',
  },
  textBold: {
    fontFamily: 'EncodeSans-Bold',
  },
  askText: {
    color: '#070821',
    marginTop: '20@vs',
    fontSize: '20@msr',
    letterSpacing: '0.6@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  actionsContainer: {
    marginTop: '5@vs',
    marginBottom: '30@vs',
    paddingHorizontal: '16@s',
  },
});
