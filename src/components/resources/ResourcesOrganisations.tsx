import React from 'react';
import { View } from 'react-native';

import ResourcesOrganisation from './ResourcesOrganisation';
import ListEmpty from '~/components/shared/screens/ListEmpty';

const ResourcesOrganisations = ({
  navigation,
  emptyText = '',
  loading = false,
  organisations = [],
}) => {
  const hasOrganisations = organisations.length > 0;
  const showNoResults = !loading && !hasOrganisations;

  return (
    <View style={{ flex: 1 }}>
      {showNoResults && (
        <ListEmpty
          text={emptyText}
        />
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
