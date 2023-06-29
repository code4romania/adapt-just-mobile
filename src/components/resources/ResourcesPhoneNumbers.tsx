import React from 'react';
import { View } from 'react-native';
import { vs } from 'react-native-size-matters/extend';

import ListEmpty from '~/components/shared/screens/ListEmpty';
import PhoneButton from '~/components/shared/buttons/PhoneButton';

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
            <View
              key={`phone_${phoneNumber.id}`}
              style={{ marginBottom: vs(20) }}
            >
              <PhoneButton
                label={phoneNumber.name}
                phone={phoneNumber.phone}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ResourcesPhoneNumbers;
