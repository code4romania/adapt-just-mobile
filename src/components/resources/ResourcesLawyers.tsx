import React from 'react';
import { View } from 'react-native';

import ResourcesLawyer from './ResourcesLawyer';
import ListEmpty from '~/components/shared/screens/ListEmpty';

const ResourcesLawyers = ({
  navigation,
  lawyers = [],
  emptyText = '',
  loading = false,
}) => {
  const hasLawyers = lawyers.length > 0;
  const showNoResults = !loading && !hasLawyers;

  return (
    <View style={{ flex: 1 }}>
      {showNoResults && (
        <ListEmpty
          text={emptyText}
        />
      )}

      {hasLawyers && (
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
