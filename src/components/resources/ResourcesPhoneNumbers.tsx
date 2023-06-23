import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import ResourcesPhoneNumber from './ResourcesPhoneNumber';

const ResourcesPhoneNumbers = ({
  loading = false,
  phoneNumbers = [],
}) => {
  const hasPhones = phoneNumbers.length > 0;
  const showNoResults = !loading && !hasPhones;

  return (
    <View style={styles.container}>
      {showNoResults && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            Nu există numere de telefon
          </Text>
        </View>
      )}

      {hasPhones && (
        <View>
          {phoneNumbers.map((phoneNumber) => (
            <ResourcesPhoneNumber
              phoneNumber={phoneNumber}
              key={`phone_${phoneNumber.id}`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ResourcesPhoneNumbers;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    color: '#333333',
    fontSize: '17@ms',
    lineHeight: '24@ms',
    textAlign: 'center',
    fontFamily: 'EncodeSans-Medium',
  },
});
