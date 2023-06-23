import React, {
  useMemo,
} from 'react';
import { View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

const ComplaintLocationsHeader = ({
  count = 0,
}) => {
  const text = useMemo(() => {
    if (!count) {
      return '';
    }

    return `${count} ${count > 1 ? 'rezultate' : 'rezultat'}`;
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

export default ComplaintLocationsHeader;

const styles = ScaledSheet.create({
  container: {
    paddingTop: '20@vs',
    marginBottom: '16@vs',
    marginHorizontal: '20@s',
  },
  text: {
    color: '#333333',
    fontSize: '14@msr',
    lineHeight: '21@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
});
