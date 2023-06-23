import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { locationIcon } from '~/assets/images';
import { ComplaintContext } from '~/context/ComplaintContext';

import ComplaintLocationsModal from './ComplaintLocationsModal';
import ArrowRightIcon from '~/components/shared/icons/ArrowRightIcon';

const hitSlop = {
  top: 12,
  left: 12,
  right: 12,
  bottom: 12,
};

const defaultText = 'Caută o locație';

const ComplaintLocationButton = ({
  location = null,
  screen = 'ComplaintLocation',
}) => {
  const hasLocation = !!location;

  const {
    setLocation,
    setLocationTo,
  } = useContext(ComplaintContext);

  const locationName = useMemo(() => {
    let name = defaultText;

    if (location?.id) {
      name = `${location.label}, ${location.city_label}`;
    } else if (location?.name) {
      name = location.name;
    }

    return name;
  }, [location]);

  const showClear = useMemo(() => {
    return locationName !== defaultText;
  }, [locationName]);

  const [listVisible, setListVisible] = useState(false);

  const buttonStyle = [
    styles.button,
    hasLocation && styles.locationButton,
  ];

  const textStyle = [
    styles.text,
    hasLocation && styles.locationText,
  ];

  useEffect(() => {
    if (location) {
      setListVisible(false);
    }
  }, [location]);

  const handleClear = () => {
    if (screen === 'ComplaintLocation') {
      setLocation(null);
    } else if (screen === 'ComplaintLocationTo') {
      setLocationTo(null);
    }
  };

  return (
    <View>
      <TouchableHighlight
        style={buttonStyle}
        underlayColor="#FFFBEB"
        onPress={() => setListVisible(true)}
      >
        <>
          <View style={styles.content}>
            {!hasLocation && (
              <SvgXml
                height={vs(28)}
                xml={locationIcon}
                style={styles.image}
              />
            )}

            <Text style={textStyle}>
              {locationName}
            </Text>
          </View>

          {!showClear && (
            <ArrowRightIcon />
          )}

          {showClear && (
            <TouchableOpacity
              hitSlop={hitSlop}
              style={styles.clearButton}
              onPress={handleClear}
            >
              <Text style={styles.clearButtonText}>
                x
              </Text>
            </TouchableOpacity>
          )}
        </>
      </TouchableHighlight>

      <ComplaintLocationsModal
        screen={screen}
        location={location}
        visible={listVisible}
        onClose={() => setListVisible(false)}
      />

    </View>
  );
};

export default ComplaintLocationButton;

const styles = ScaledSheet.create({
  button: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '6@msr',
    borderColor: '#FDE68A',
    backgroundColor: '#FFF',
    paddingVertical: '13@vs',
    paddingHorizontal: '24@s',
  },
  locationButton: {
    paddingVertical: '17@vs',
    paddingHorizontal: '16@s',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: '13@s',
  },
  text: {
    flex: 1,
    color: '#111827',
    fontSize: '16@msr',
    lineHeight: '20@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-SemiBold',
  },
  locationText: {
    fontSize: '14@msr',
    marginVertical: '6@vs',
  },
  clearButton: {
    width: '24@msr',
    height: '24@msr',
    alignItems: 'center',
    borderRadius: '12@msr',
    justifyContent: 'center',
    backgroundColor: '#9CA3AF',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: '16@msr',
    lineHeight: '16@msr',
    fontFamily: 'Montserrat-SemiBold',
  },
});
