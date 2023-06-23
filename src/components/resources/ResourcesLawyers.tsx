import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import ResourcesLawyer from './ResourcesLawyer';

const ResourcesLawyers = ({
  navigation,
  lawyers = [],
  loading = false,
}) => {
  const hasOrganisations = lawyers.length > 0;
  const showNoResults = !loading && !hasOrganisations;

  return (
    <View style={styles.container}>
      {showNoResults && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            Nu există sfaturi avocat
          </Text>
        </View>
      )}

      {hasOrganisations && (
        <View>
          {lawyers.map((lawyer) => (
            <ResourcesLawyer
              lawyer={lawyer}
              navigation={navigation}
              key={`lawyer_${lawyer.id}`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ResourcesLawyers;

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
