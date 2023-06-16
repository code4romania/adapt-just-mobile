import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Voice from 'react-native-voice';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';

import { microphoneIcon } from '~/assets/images';

const FormRecording = ({
  onRecording = (e) => {},
}) => {
  const isStarted = useRef(false);
  const [started, setStarted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      Voice.onSpeechStart = onSpeechStart;
      Voice.onSpeechEnd = onSpeechEnd;
      Voice.onSpeechError = onSpeechError;

      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechPartialResults = onSpeechPartialResults;

      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }, [])
  );

  useEffect(() => {
    if (started) {
      isStarted.current = true;
      startRecognizing()
        .then(() => {})
        .catch((e) => {});
    } else {
      if (isStarted.current) {
        isStarted.current = false;
        stopRecognizing()
          .then(() => {})
          .catch((e) => {});
      }
    }
  }, [started]);

  const openSettings = useCallback(async () => {
    try {
      await Linking.openSettings();
    } catch (e) {}
  }, []);

  const onSpeechStart = () => {};

  const onSpeechEnd = () => {};

  const onSpeechError = (e) => {};

  const onSpeechResults = (e) => {
    if (!e.value.length) {
      return;
    }

    onRecording(e.value[0]);
  };

  const onSpeechPartialResults = (e) => {};

  const startRecording = () => {
    setStarted(true);
  };

  const stopRecording = async () => {
    setStarted(false);
  };

  const startRecognizing = async () => {
    const isAvailable = await Voice.isAvailable();
    if (!isAvailable) {
      alertVoiceUnavailable();
      return;
    }

    await Voice.start('ro-RO');
  };

  const stopRecognizing = async () => {
    await Voice.stop();
  };

  const alertVoiceUnavailable = () => {
    Alert.alert(
      'Microfonul este dezactivat'.toUpperCase(),
      'Pentru a vorbi este nevoie de activarea microfonului din setările telefonului.'.toUpperCase(),
      [
        {
          text: 'ANULEAZĂ',
          style: 'cancel',
          onPress: () => null,
        },
        {
          text: 'SETĂRI',
          onPress: openSettings,
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Dacă nu poți să scrii, <Text style={styles.textBold}>ține apăsat</Text> pe microfon ca să vorbești.
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          started && styles.active,
        ]}
        onPressOut={stopRecording}
        onLongPress={startRecording}
      >
        <SvgXml
          height={vs(28)}
          xml={microphoneIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FormRecording;

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: '#333333',
    fontSize: '14@msr',
    textAlign: 'center',
    lineHeight: '21@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  textBold: {
    fontFamily: 'EncodeSans-Bold',
  },
  button: {
    width: '64@msr',
    height: '64@msr',
    marginTop: '24@vs',
    alignItems: 'center',
    borderRadius: '32@msr',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,

    // Android
    elevation: 5
  },
  active: {
    backgroundColor: '#FDE68A',
    transform: [{ scale: 1.1 }],
  },
});
