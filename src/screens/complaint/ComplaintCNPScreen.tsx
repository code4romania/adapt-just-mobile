import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import { UploadUtil } from '~/utils';
import style from '~/components/complaint/style';
import { NetInfoContext } from '~/context/NetInfoContext';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormUpload from '~/components/shared/form/FormUpload';
import FormStepper from '~/components/shared/form/FormStepper';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import FormRecording from '~/components/shared/form/FormRecording';
import FormTextInput from '~/components/shared/form/FormTextInput';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ComplaintUploads from '~/components/complaint/ComplaintUploads';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const currentStep = 2;

const listenText = [
  `Pasul ${currentStep} din `,
  'Care este C N P-ul tău ?',
  'Scrie codul numeric personal',
  'Cod numeric personal',
  'Dacă nu poți să scrii, ține apăsat pe microfon ca să vorbești.',
  'Sau apasă mai jos și încarcă o poză cu buletinul dacă îl ai',
  'Încarcă poza',
  'Înapoi',
  'Continuă',
];

const letterNumbers = ['zero', 'unu', 'doi', 'trei', 'patru', 'cinci', 'șase', 'șapte', 'opt', 'nouă'];

const ComplaintCNPScreen = ({
  route,
  navigation,
}) => {
  const {
    isConnected,
  } = useContext(NetInfoContext);

  const {
    cnp,
    steps,
    idCardUpload,
    setCnp,
    setIdCardUpload,
    setComplaintStep,
  } = useContext(ComplaintContext);

  const [loading, setLoading] = useState(false);

  const hasUploads = idCardUpload !== null;
  const nextEnabled = !loading;

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0]}${steps}`;

    if (cnp) {
      text[3] = `, ${cnp.split('').join(' ')}.`;
    }

    return text;
  }, [cnp]);

  useEffect(() => {
    if (route?.params?.step) {
      navigation.navigate('ComplaintLocation', {
        step: route.params.step,
      });
    }
  }, [route?.params]);

  const handleRecording = (result = '') => {
    result = result.toLowerCase();
    const idx = letterNumbers.findIndex((w) => result === w);

    if (idx !== -1) {
      result = `${idx}`;
    }

    result = result.replace(/[^0-9]/g, '');

    setCnp(`${result}`);
  };

  const handleUpload = async (file) => {
    if (!file) {
      return;
    }

    if (!isConnected) {
      setIdCardUpload(file);
      return;
    }

    setLoading(true);

    const upload = await UploadUtil.uploadFile(file);

    if (upload) {
      setIdCardUpload(upload);
    }

    setLoading(false);
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;
    setComplaintStep({ step: nextStep });
    navigation.navigate('ComplaintLocation');
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
              title="Care este CNP-ul tău?"
            />
            <Text style={styles.subtitle}>
              Scrie codul numeric personal
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <FormTextInput
              value={cnp}
              inputProps={{
                autoFocus: true,
                keyboardType: 'number-pad',
              }}
              placeholder="Cod numeric personal"
              onChange={setCnp}
            />
          </View>

          <FormRecording
            onRecording={handleRecording}
          />

          <View style={styles.uploadContainer}>
            <Text style={styles.text}>
              Sau apasă mai jos și <Text style={styles.textBold}>încarcă o poză cu buletinul</Text> dacă îl ai
            </Text>

            <FormUpload
              hideDocs
              description=""
              title="Încarcă poza"
              loading={loading}
              onUpload={handleUpload}
            />
          </View>

          {hasUploads && (
            <View style={styles.uploadsContainer}>
              <ComplaintUploads
                title="Poză buletin"
                uploads={[idCardUpload]}
                onDelete={() => setIdCardUpload(null)}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <ScreenActions
          nextEnabled={nextEnabled}
          onNext={handleNext}
        />
      </View>
    </ScreenContainer>
  );
};

export default ComplaintCNPScreen;

const styles = ScaledSheet.create({
  ...style,
  inputContainer: {
    marginTop: '30@vs',
    marginBottom: '30@vs',
    marginHorizontal: '-8@s',
  },
  uploadContainer: {
    marginTop: '30@vs',
  },
  uploadsContainer: {
    marginVertical: '30@vs',
  },
  text: {
    color: '#333333',
    fontSize: '14@msr',
    textAlign: 'center',
    lineHeight: '21@msr',
    marginBottom: '20@vs',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  textBold: {
    fontFamily: 'EncodeSans-Bold',
  },
});
