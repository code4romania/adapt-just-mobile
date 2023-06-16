import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const hitSlop = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20,
};

const VideoFullscreen = ({
  video = null,
  visible = false,
  onClose = () => {},
}) => {
  if (!video) {
    return null;
  }

  let { top } = useSafeAreaInsets();
  top = top || vs(20);

  const closeStyle = [
    styles.closeButton,
    { top },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'fade'}
      supportedOrientations={['portrait']}
    >
      <View style={styles.container}>
        <TouchableOpacity
          hitSlop={hitSlop}
          style={closeStyle}
          onPress={onClose}
        >
          <Text style={styles.closeIcon}>x</Text>
        </TouchableOpacity>

        <Video
          controls
          paused={false}
          resizeMode="contain"
          style={styles.video}
          source={{ uri: video?.uri }}
          fullscreenOrientation="portrait"
        />
      </View>
    </Modal>
  );
};

export default VideoFullscreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  closeButton: {
    right: 0,
    zIndex: 1,
    width: '44@msr',
    height: '44@msr',
    position: 'absolute',
    alignItems: 'center',
    borderRadius: '22@msr',
    justifyContent: 'center',
    backgroundColor: '#00000077',
  },
  closeIcon: {
    color: '#FFF',
    fontSize: '24@msr',
    includeFontPadding: false,
    fontFamily: 'Montserrat-Regular',
  },
  video: {
    zIndex: 2,
    width: '100%',
    height: '400@vs',
  },
});
