import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { closeIcon } from '~/assets/images';
import BackgroundGradient from '~/components/shared/screens/BackgroundGradient';

const hitSlop = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20,
};

const ComplaintEmailsModal = ({
  emails = [],
  visible = false,
  onClose = () => {},
}) => {
  const {
    top: paddingTop,
    bottom: marginBottom,
  } = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      paddingTop,
      marginBottom,
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
    >
      <BackgroundGradient>
        <View style={containerStyle}>
          <View style={styles.header}>
            <TouchableOpacity
              style={{}}
              hitSlop={hitSlop}
              onPress={onClose}
            >
              <SvgXml
                xml={closeIcon}
                height={vs(14)}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.title}>
              Adresele de email care vor primi plângerea ta
            </Text>

            {emails.map((email, index) => (
              <Text
                style={styles.text}
                key={`email_${index}`}
              >
                {email}
              </Text>
            ))}
          </ScrollView>
        </View>
      </BackgroundGradient>
    </Modal>
  );
};

export default ComplaintEmailsModal;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: '10@vs',
    flexDirection: 'row',
    marginBottom: '20@vs',
    paddingHorizontal: '22@s',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    paddingHorizontal: '20@s',
  },
  title: {
    color: '#333333',
    fontSize: '16@msr',
    lineHeight: '21@msr',
    marginBottom: '25@vs',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  text: {
    color: '#333333',
    fontSize: '16@msr',
    lineHeight: '21@msr',
    marginBottom: '15@vs',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
});
