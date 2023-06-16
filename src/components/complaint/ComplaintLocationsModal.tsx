import React, {
  useState,
} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { closeIcon } from '~/assets/images';

import ComplaintLocations from './ComplaintLocations';
import ComplaintLocationsSearch from './ComplaintLocationsSearch';
import BackgroundGradient from '~/components/shared/screens/BackgroundGradient';

const hitSlop = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20,
};

const ComplaintLocationsModal = ({
  visible = false,
  location = null,
  screen = 'ComplaintLocation',
  onClose = () => {},
}) => {
  const {
    top: paddingTop,
    bottom: marginBottom,
  } = useSafeAreaInsets();

  const [search, setSearch] = useState('');

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

          <View style={styles.content}>
            <Text style={styles.text}>
              Scrie localitatea sau numele spitalului pentru a găsi locația unde te afli
            </Text>

            <View style={styles.search}>
              <ComplaintLocationsSearch
                search={search}
                onSearch={setSearch}
              />
            </View>

            <View style={styles.list}>
              <ComplaintLocations
                search={search}
                screen={screen}
                location={location}
              />
            </View>
          </View>
        </View>
      </BackgroundGradient>
    </Modal>
  );
};

export default ComplaintLocationsModal;

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
    paddingHorizontal: '16@s',
  },
  text: {
    color: '#333333',
    fontSize: '14@msr',
    lineHeight: '21@msr',
    marginBottom: '20@vs',
    marginHorizontal: '8@s',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  search: {
    marginHorizontal: '4@s',
  },
  list: {
    flex: 1,
    marginTop: '10@vs',
  },
});
