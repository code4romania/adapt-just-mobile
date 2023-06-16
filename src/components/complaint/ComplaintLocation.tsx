import React, {
  useContext,
  useCallback,
} from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import { ComplaintContext } from '~/context/ComplaintContext';
import RadioCheck from '~/components/shared/RadioCheck';

const diacritics = {
  'ă': 'a',
  'â': 'a',
  'î': 'i',
  'ș': 's',
  'ț': 't',
};

const ComplaintLocation = ({
  location,
  search = '',
  isSelected = false,
  screen = 'ComplaintLocation',
}) => {
  const {
    setLocation,
    setLocationTo,
  } = useContext(ComplaintContext);

  const containerStyle = [
    styles.container,
    isSelected && styles.selected,
  ];

  const getLocationName = useCallback(() => {
    const label = `${location.label}, ${location.city_label}`;
    const name = `${location.name}, ${location.city_name}}`.toLowerCase();

    if (search) {
      const searchLower = search.toLowerCase().replace(
        /[ăâîșț]/g,
        c => diacritics[c],
      );

      const index = name.indexOf(searchLower);

      if (index !== -1) {
        const first = label.slice(0, index);
        const bold = label.slice(index, index + search.length);
        const last = label.slice(index + search.length);

        return (
          <Text style={styles.text}>
            {first}<Text style={styles.textBold}>{bold}</Text>{last}
          </Text>
        );
      }
    }

    return (
      <Text style={styles.text}>
        {label}
      </Text>
    );
  }, [search]);

  const handleChange = () => {
    if (screen === 'ComplaintLocationTo') {
      setLocationTo(location);
    } else {
      setLocation(location);
    }
  };

  return (
    <TouchableOpacity
      disabled={isSelected}
      style={containerStyle}
      onPress={handleChange}
    >
      <RadioCheck checked={isSelected} />
      {getLocationName()}
    </TouchableOpacity>
  );
};

export default ComplaintLocation;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: '6@msr',
    alignItems: 'center',
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    paddingVertical: '19@vs',
    paddingHorizontal: '17@s',
  },
  selected: {
    backgroundColor: '#FFFBEB',
  },
  text: {
    flex: 1,
    color: '#111827',
    fontSize: '14@msr',
    marginLeft: '12@s',
    lineHeight: '20@msr',
    fontFamily: 'EncodeSans-Regular',
  },
  textBold: {
    fontFamily: 'EncodeSans-Bold',
  },
});
