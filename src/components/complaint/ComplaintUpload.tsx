import React, {
  useMemo,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { attachmentIcon } from '~/assets/images';

const ComplaintUpload = ({
  upload,
  isLast = false,
  onShow = () => {},
  onDelete = () => {},
}) => {
  const canShow = useMemo(() => {
    let isPdf = false;
    let isImage = false;
    let isVideo = false;

    if (upload?.id) {
      isPdf = upload?.mime?.includes('pdf') || false;
      isImage = upload?.mime?.includes('image') || false;
      isVideo = upload?.mime?.includes('video') || false;
    } else {
      isPdf = upload?.type?.includes('pdf') || false;
      isImage = upload?.type?.includes('image') || false;
      isVideo = upload?.type?.includes('video') || false;
    }

    return isImage || isVideo;
    // return isPdf || isImage || isVideo;
  }, [upload]);

  const containerStyle = [
    styles.container,
    !isLast && styles.separator,
  ];
  
  return (
    <>
      <View style={containerStyle}>
        <SvgXml
          height={vs(18)}
          style={styles.icon}
          xml={attachmentIcon}
        />
        <Text
          numberOfLines={2}
          style={styles.name}
        >
          {upload?.fileName || upload?.name || ''}
        </Text>

        <View style={styles.actions}>
          {canShow && (
            <>
              <TouchableOpacity onPress={onShow}>
                <Text style={styles.actionText}>
                  Vezi
                </Text>
              </TouchableOpacity>

              <View style={styles.actionSeparator} />
            </>
          )}

          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.actionText}>
              Șterge
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ComplaintUpload;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '10@vs',
    paddingHorizontal: '12@s',
  },
  icon: {
    marginRight: '11@s',
  },
  name: {
    flex: 1,
    color: '#111827',
    fontSize: '14@ms',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Regular',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  actions: {
    marginLeft: '5@s',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#D97706',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  actionSeparator: {
    width: '1@ms',
    height: '20@vs',
    marginHorizontal: '12@s',
    backgroundColor: '#D1D5DB',
  },
});
