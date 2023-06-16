import React, {
  useMemo,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters/extend';
import AsyncStorage from '@react-native-async-storage/async-storage';

import style from '~/components/complaint/style';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormStepper from '~/components/shared/form/FormStepper';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';
import SuccessHomeButton from '~/components/shared/buttons/SuccessHomeButton';

const listenText = [
  'Pasul :steps din :steps',
  'Plângerea ta a fost trimisă !',
  'Plângerea ta a fost trimisă către ',
  'Ecran principal'
];

const ComplaintSuccessScreen = ({
  navigation,
}) => {
  const {
    steps,
    agenciesText,
  } = useContext(ComplaintContext);

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0].replaceAll(':steps', steps)}`;
    text[2] = `${text[2]}${agenciesText}`;

    return text;
  }, []);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        if (e.data.action.type !== 'NAVIGATE') {
          e.preventDefault();
        }
      }),
    [navigation]
  );

  useFocusEffect(() => {
    const onBackPress = () => true;

    BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onBackPress
      );
    };
  });

  const handleNext = async () => {
    await AsyncStorage.removeItem('@complaint');
    navigation.navigate('Home');
  };

  return (
    <ScreenContainer
      listenText={lText}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.content}>
          <FormStepper
            step={steps}
            steps={steps}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title="Plângerea ta a fost trimisă !"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.infoText}>
              Plângerea ta a fost trimisă către
            </Text>

            <Text style={styles.infoText}>
              {'\r\n'}<Text style={styles.infoTextBold}>
                {agenciesText}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[
        styles.actionsContainer,
        styles.buttonContainer,
      ]}>
        <SuccessHomeButton
          onPress={handleNext}
        />
      </View>
    </ScreenContainer>
  );
};

export default ComplaintSuccessScreen;

const styles = ScaledSheet.create({
  ...style,
  info: {
    marginTop: '16@vs',
  },
  infoText: {
    color: '#111827',
    fontSize: '18@msr',
    lineHeight: '22@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  infoTextBold: {
    fontFamily: 'EncodeSans-Bold',
  },
  buttonContainer: {
    marginHorizontal: '36@s',
  },
});
