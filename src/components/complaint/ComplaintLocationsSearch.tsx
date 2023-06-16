import React from 'react';
import {
  View,
  TextInput,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { searchIcon } from '~/assets/images';

const ComplaintLocationsSearch = ({
  search = '',
  onSearch = (s) => {},
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        keyboardType="default"
        autoCapitalize="characters"
        placeholder="CAUTĂ ÎN LISTĂ"
        enablesReturnKeyAutomatically
        placeholderTextColor="#6B7280"
        onChangeText={onSearch}
      />

      <SvgXml
        xml={searchIcon}
        height={vs(17)}
      />
    </View>
  );
};

export default ComplaintLocationsSearch;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    height: '45@vs',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '6@msr',
    borderColor: '#D1D5DB',
    backgroundColor: '#FFF',
    paddingHorizontal: '13@s',

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,

    // Android
    elevation: 5
  },
  input: {
    flex: 1,
    color: '#111827',
    fontSize: '17@msr',
    marginRight: '5@s',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Regular',
  },
});
