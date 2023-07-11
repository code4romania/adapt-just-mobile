import React, {
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { ScaledSheet } from 'react-native-size-matters/extend';

import ComplaintUpload from './ComplaintUpload';
import ImageFullscreen from '~/components/shared/image/ImageFullscreen';
import VideoFullscreen from '~/components/shared/image/VideoFullscreen';

const ComplaintUploads = ({
  uploads = [],
  onDelete = (i) => {},
}) => {
  const [showUpload, setShowUpload] = useState(null);

  const showUploadType = useMemo(() => {
    let isPdf = false;
    let isImage = false;
    let isVideo = false;

    if (showUpload?.id) {
      isPdf = showUpload?.mime?.includes('pdf') || false;
      isImage = showUpload?.mime?.includes('image') || false;
      isVideo = showUpload?.mime?.includes('video') || false;
    } else {
      isPdf = showUpload?.type?.includes('pdf') || false;
      isImage = showUpload?.type?.includes('image') || false;
      isVideo = showUpload?.type?.includes('video') || false;
    }

    return {
      isPdf,
      isImage,
      isVideo,
    };
  }, [showUpload]);

  useEffect(() => {
    if (showUploadType.isPdf) {
      const uri = showUpload?.dataUrl || showUpload?.uri || null;

      if (!showUpload?.id) {
        FileViewer.open(uri)
          .then(() => {})
          .catch((error) => {});

        return;
      }

      const extension = uri.split(/[#?]/)[0].split('.').pop().trim();
      const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

      const options = {
        fromUrl: uri,
        toFile: localFile,
      };

      RNFS.downloadFile(options)
        .promise.then(() => FileViewer.open(localFile))
        .then(() => {})
        .catch((error) => {});
    }
  }, [showUploadType]);

  const handleShow = (index) => {
    const upload = uploads?.[index] || null;
    if (!upload) {
      return;
    }

    let uri = upload?.uri || upload?.dataUrl || null;

    const showFile = {
      ...upload,
      uri,
    };

    setShowUpload(showFile);
  };

  return (
    <View>
      <Text style={styles.title}>
        Dovezi adăugate
      </Text>

      <View style={styles.container}>
        {uploads.map((upload, index) => (
          <ComplaintUpload
            upload={upload}
            key={`upload-${index}`}
            isLast={index === uploads.length - 1}
            onShow={() => handleShow(index)}
            onDelete={() => onDelete(index)}
          />
        ))}
      </View>

      {showUploadType.isImage && (
        <ImageFullscreen
          visible={true}
          images={[{ uri: showUpload?.uri }]}
          onClose={() => setShowUpload(null)}
        />
      )}

      {showUploadType.isVideo && (
        <VideoFullscreen
          visible={true}
          video={showUpload}
          onClose={() => setShowUpload(null)}
        />
      )}
    </View>
  );
};

export default ComplaintUploads;

const styles = ScaledSheet.create({
  title: {
    color: '#1F2937',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  container: {
    borderWidth: 1,
    marginTop: '5@vs',
    borderRadius: '6@msr',
    borderColor: '#E5E7EB',
  },
  backgroundVideo: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});
