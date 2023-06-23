import React from 'react';
import { View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

const ListEmpty = ({
  text = 'Nu s-au găsit rezultate',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

export default ListEmpty;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#333333',
    fontSize: '17@ms',
    lineHeight: '24@ms',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
});
