import React, {
  useContext,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import { ComplaintContext } from '~/context/ComplaintContext';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Ecran principal',
  'Urmează să completezi informații despre tine',
  'Nu te îngrijora !',
  'Prin mesajul tău, vom spune autorităților să aibă grijă de datele tale pentru ca tu să fii în siguranță',
  'Înapoi',
  'Continuă',
];

const ComplaintDataScreen = ({
  navigation,
}) => {
  const {
    setDataShown,
  } = useContext(ComplaintContext);

  const handleNext = () => {
    setDataShown(true);
    navigation.navigate('ComplaintName');
  };

  return (
    <ScreenContainer
      showHomeButton
      listenText={listenText}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.text}>
            Urmează să completezi informații despre tine.
          </Text>

          <Text style={[styles.text, styles.textBold]}>
            {`\r\n`}Nu te îngrijora !{`\r\n`}
          </Text>

          <Text style={styles.text}>
            Prin mesajul tău, vom spune autorităților să aibă grijă de datele tale pentru ca tu să fii în siguranță.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <ScreenActions onNext={handleNext} />
      </View>
    </ScreenContainer>
  );
};

export default ComplaintDataScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: '24@s',
  },
  content: {
    flex: 1,
    marginTop: '12@vs',
    marginBottom: '20@vs',
    justifyContent: 'center',
  },
  text: {
    color: '#111827',
    fontSize: '17@msr',
    lineHeight: '30@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Medium',
  },
  textBold: {
    fontSize: '24@msr',
    fontFamily: 'EncodeSans-Bold',
  },
  actionsContainer: {
    marginTop: '5@vs',
    marginBottom: '30@vs',
    paddingHorizontal: '16@s',
  },
});
