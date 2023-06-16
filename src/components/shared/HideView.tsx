import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import dayjs from 'dayjs';
import 'dayjs/locale/ro';

import { clockIcon } from '~/assets/images';
import { HideViewContext } from '~/context/HideViewContext';

import ScreenContainer from './screens/ScreenContainer';

dayjs.locale('ro');

const HideView = ({
  visible = false,
}) => {
  const { setVisible } = useContext(HideViewContext);

  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <ScreenContainer showTab={false}>
      <View style={styles.content}>
        <Text style={styles.infoText}>
          Bună,{`\r\n`}este
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setVisible(false)}
        >
          <Text style={styles.timeText}>
            {date.format('HH:mm')}
          </Text>
        </TouchableOpacity>

        <Text style={styles.dateText}>
          {date.format('dddd')},{`\r\n`}
          {date.format('DD.MM.YYYY')}.
        </Text>

        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            Apasă pe ceas ca să te{`\r\n`}întorci unde erai
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.closeButton}
        onPress={() => setVisible(false)}
      >
        <Image
          source={clockIcon}
          resizeMode="contain"
          style={styles.closeImage}
        />
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export default HideView;

const styles = ScaledSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingTop: '150@vs',
    paddingHorizontal: '20@s',
  },
  timeText: {
    color: '#264667',
    fontSize: '112@msr',
    lineHeight: '170@msr',
    fontFamily: 'Montserrat-Bold',
  },
  infoText: {
    color: '#264667',
    fontSize: '36@msr',
    fontFamily: 'Montserrat-Bold',
  },
  dateText: {
    zIndex: 1,
    color: '#264667',
    fontSize: '30@msr',
    marginTop: '10@vs',
    fontFamily: 'Montserrat-Bold',
  },
  helpContainer: {
    marginTop: '15@vs',
  },
  helpText: {
    color: '#264667',
    fontSize: '16@msr',
    lineHeight: '20@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'Montserrat-SemiBold',
  },
  closeButton: {
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  closeImage: {
    width: '250@s',
  },
});
