import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import BackButton from '~/components/shared/buttons/BackButton';
import NextButton from '~/components/shared/buttons/NextButton';

const ScreenActions = ({
  loading = false,
  nextEnabled = true,
  nextText = 'Continuă',
  onNext = () => {},
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <BackButton onPress={handleBack} />
      <NextButton
        text={nextText}
        loading={loading}
        enabled={nextEnabled}
        onPress={onNext}
      />
    </View>
  );
};

export default ScreenActions;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
