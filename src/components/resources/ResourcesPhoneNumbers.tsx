import React from 'react';
import { View } from 'react-native';

import ResourcesPhoneNumber from './ResourcesPhoneNumber';
import ListEmpty from '~/components/shared/screens/ListEmpty';

const ResourcesPhoneNumbers = ({
  emptyText = '',
  loading = false,
  phoneNumbers = [],
}) => {
  const hasPhones = phoneNumbers.length > 0;
  const showNoResults = !loading && !hasPhones;

  return (
    <View style={{ flex: 1 }}>
      {showNoResults && (
        <ListEmpty
          text={emptyText}
        />
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
