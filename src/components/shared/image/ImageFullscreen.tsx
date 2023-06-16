import React from 'react';
import ImageView from 'react-native-image-viewing';

const ImageFullscreen = ({
  images = [],
  visible = false,
  onClose = () => {},
}) => {
  return (
    <ImageView
      imageIndex={0}
      images={images}
      visible={visible}
      onRequestClose={onClose}
    />
  );
};

export default ImageFullscreen;
