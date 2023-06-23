import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import ArrowRightIcon from '~/components/shared/icons/ArrowRightIcon';

const ResourcesOrganisation = ({
  navigation,
  organisation,
}) => {
  const hasIcon = !!organisation?.upload?.dataUrl || false;

  const handlePress = () => {
    const organisationId = organisation.id;

    navigation.navigate(
      'ResourcesOrganisation',
      { organisationId }
    );
  };

  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={'#FBBF24'}
      onPress={handlePress}
    >
      <>
        {hasIcon && (
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={{ uri: organisation.upload.dataUrl }}
          />
        )}

        <View style={styles.info}>
          <Text style={styles.title}>
            {organisation.name}
          </Text>
        </View>

        <ArrowRightIcon />
      </>
    </TouchableHighlight>
  );
};

export default ResourcesOrganisation;

const styles = ScaledSheet.create({
  button: {
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20@vs',
    borderRadius: '8@msr',
    borderColor: '#FBBF24',
    backgroundColor: '#FFF',
    paddingVertical: '18@vs',
    paddingHorizontal: '14@s',

    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowColor: '#000000',
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#111827',
    fontSize: '16@msr',
    lineHeight: '20@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Bold',
  },
  icon: {
    width: '40@msr',
    height: '40@msr',
    marginRight: '10@s',
  },
});
