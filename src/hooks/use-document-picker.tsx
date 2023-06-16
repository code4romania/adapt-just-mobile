import React from 'react';
import DocumentPicker from 'react-native-document-picker';

const useDocumentPicker = () => {
  const openDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });

      return result;
    } catch (error) {}

    return null;
  };

  return {
    openDocument,
  };
};

export default useDocumentPicker;
