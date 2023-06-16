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

import { UploadUtil } from '~/utils';
import style from '~/components/complaint/style';
import { NetInfoContext } from '~/context/NetInfoContext';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormUpload from '~/components/shared/form/FormUpload';
import FormStepper from '~/components/shared/form/FormStepper';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ComplaintUploads from '~/components/complaint/ComplaintUploads';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Pasul 5 din ',
  'Încarcă dovezile',
  'Încarcă dovada',
  'Poate fi o poză, un videoclip, o înregistrare, un document sau orice alt fișier',
  'Înapoi',
  'Continuă',
];

const ComplaintUploadsScreen = ({
  navigation,
}) => {
  const {
    isConnected,
  } = useContext(NetInfoContext);

  const {
    steps,
    uploads,
    setUploads,
  } = useContext(ComplaintContext);

  const [loading, setLoading] = useState(false);

  const hasUploads = uploads.length > 0;
  const nextEnabled = hasUploads && !loading;

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0]}${steps}`;
    return text;
  }, []);

  const handleNext = () => {
    navigation.navigate('ComplaintPreview');
  };

  const handleUpload = async (file) => {
    if (!file) {
      return;
    }

    if (!isConnected) {
      setUploads([...uploads, file]);
      return;
    }

    setLoading(true);

    const upload = await UploadUtil.uploadFile(file);

    if (upload) {
      setUploads([...uploads, upload]);
    }

    setLoading(false);
  };

  const handleDelete = (fileIndex) => {
    const newUploads = uploads.filter(
      (_, index) => index !== fileIndex
    );

    setUploads(newUploads);
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
            step={5}
            steps={steps}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title="Încarcă dovezile"
            />
          </View>

          <View style={styles.uploadButton}>
            <FormUpload
              loading={loading}
              onUpload={handleUpload}
            />
          </View>

          {hasUploads && (
            <View style={styles.uploadsContainer}>
              <ComplaintUploads
                uploads={uploads}
                onDelete={handleDelete}
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

export default ComplaintUploadsScreen;

const styles = ScaledSheet.create({
  ...style,
  uploadButton: {
    marginTop: '26@vs',
  },
  uploadsContainer: {
    marginTop: '32@vs',
  },
});

