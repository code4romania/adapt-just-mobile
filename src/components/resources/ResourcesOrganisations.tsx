import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import ResourcesOrganisation from './ResourcesOrganisation';

const ResourcesOrganisations = ({
  navigation,
  loading = false,
  organisations = [],
}) => {
  const hasOrganisations = organisations.length > 0;
  const showNoResults = !loading && !hasOrganisations;

  return (
    <View style={styles.container}>
      {showNoResults && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            Nu există organizații
          </Text>
        </View>
      )}

      {hasOrganisations && (
        <View>
          {organisations.map((organisation) => (
            <ResourcesOrganisation
              navigation={navigation}
              organisation={organisation}
              key={`organisation_${organisation.id}`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ResourcesOrganisations;

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
