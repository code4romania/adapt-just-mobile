import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { uploadIcon } from '~/assets/images';
import useMediaPicker from '~/hooks/use-media-picker';
import useDocumentPicker from '~/hooks/use-document-picker';

const dTitle = 'Încarcă dovada';
const dDescription = 'Poate fi o poză, un videoclip, o înregistrare, un document sau orice alt fișier';

const sheetOptions = [
  'Cameră foto',
  'Bibliotecă foto și video',
  'Document',
  'Anulează',
];

const cancelButtonIndex = 3;

const options = {
  cancelButtonIndex,
  options: sheetOptions,
};

const FormUpload = ({
  title = dTitle,
  loading = false,
  description = dDescription,
  onUpload = (u) => {},
}) => {
  const {
    openCamera,
    checkPermission,
    openMediaLibrary,
  } = useMediaPicker();

  const {
    openDocument,
  } = useDocumentPicker();

  const { showActionSheetWithOptions } = useActionSheet();

  const handlePress = () => {
    showActionSheetWithOptions(
      options,
      handleOption
    );
  };

  const handleOption = async (index) => {
    if (index === cancelButtonIndex) {
      return;
    }

    try {
      if (index === 0) {
        if (await checkPermission()) {
          const result = await openCamera();
          const file = result?.assets?.[0] || null;
          onUpload(file);
        }
      }

      if (index === 1) {
        const result = await openMediaLibrary();
        const file = result?.assets?.[0] || null;
        onUpload(file);
      }

      if (index === 2) {
        const file = await openDocument();
        onUpload(file);
      }
    } catch (error) {}
  };

  return (
    <TouchableOpacity
      disabled={loading}
      activeOpacity={0.6}
      style={styles.container}
      onPress={handlePress}
    >
      <SvgXml
        height={vs(36)}
        xml={uploadIcon}
        style={styles.icon}
      />

      {/* <Image
        source={uploadIcon}
        style={styles.icon}
      /> */}
      <Text style={styles.title}>
        {title}
      </Text>
      {!!description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}

      {loading && (
        <ActivityIndicator
          size="small"
          color="#D97706"
          style={styles.loading}
        />
      )}
    </TouchableOpacity>
  );
};

export default FormUpload;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: '6@msr',
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
    paddingVertical: '20@vs',
    paddingHorizontal: '20@s',
  },
  icon: {
    width: '36@msr',
    height: '36@msr',
  },
  title: {
    color: '#D97706',
    fontSize: '14@ms',
    marginTop: '12@vs',
    lineHeight: '20@ms',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  description: {
    color: '#6B7280',
    marginTop: '4@vs',
    fontSize: '12@ms',
    lineHeight: '16@ms',
    textAlign: 'center',
    marginHorizontal: '20@s',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Regular',
  },
  loading: {
    marginTop: '12@vs',
  },
});
