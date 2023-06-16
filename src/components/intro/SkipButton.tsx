import React, {
  useContext,
} from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import { IntroContext } from '~/context/IntroContext';

const SkipButton = () => {
  const { handleIntro } = useContext(IntroContext);

  const handleSkip = async () => {
    await handleIntro();
  };

  return (
    <TouchableOpacity
      onPress={handleSkip}
    >
      <Text style={styles.text}>
        Treci peste intro
      </Text>
    </TouchableOpacity>
  );
};

export default SkipButton;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    color: '#111827',
    fontSize: '14@msr',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    fontFamily: 'EncodeSans-SemiBold',
  },
});
