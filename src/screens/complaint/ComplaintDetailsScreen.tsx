import React, {
  useMemo,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import {
  beatenIcon,
  abusedIcon,
  sedatedIcon,
  punishedIcon,
  sufferedIcon,
} from '~/assets/images';
import style from '~/components/complaint/style';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormStepper from '~/components/shared/form/FormStepper';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';
import FormCheckButton from '~/components/shared/buttons/FormCheckButton';

const currentStep = 4;

const listenText = [
  `Pasul ${currentStep} din `,
  'Ce ai pățit ?',
  'Alege toate variantele care ți se aplică',
  'Am fost bătut sau bătută',
  'Am fost violat sau violată',
  'Am fost sedat sau sedată',
  'Am fost legat sau legată',
  'Altceva',
  'Înapoi',
  'Continuă',
];

const ComplaintDetailsScreen = ({
  route,
  navigation,
}) => {
  const {
    steps,
    details,
    setDetails,
    setComplaintStep,
  } = useContext(ComplaintContext);

  const otherChecked = useMemo(() => {
    return details.includes('other');
  }, [details]);

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0]}${steps}`;
    return text;
  }, []);

  const nextEnabled = !!details.length;

  useEffect(() => {
    const reason = route.params?.reason || '';

    if (reason) {
      setDetails({
        reason,
        details: [...details, 'other'],
      });

      navigation.setParams({ reason: null });
    }

    if (route?.params?.step) {
      goNextStep(route?.params?.step);
    }
  }, [route]);

  const goNextStep = (step) => {
    if (step > currentStep) {
      navigation.navigate('ComplaintProof', { step });
    }
  };

  const handleChange = (value) => {
    if (value === 'other') {
      if (otherChecked) {
        setDetails({
          details: details.filter((d) => d !== 'other'),
          reason: '',
        });
      } else {
        navigation.navigate('ComplaintReason');
      }
    } else {
      const newDetails = details.includes(value)
        ? details.filter((item) => item !== value)
        : [...details, value];

      setDetails({
        details: newDetails,
      });
    }
  };

  const handleNext = () => {
    setComplaintStep({ step: currentStep + 1 });
    navigation.navigate('ComplaintProof');
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
            steps={steps}
            step={currentStep}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title="Ce ai pățit?"
            />
            <Text style={styles.subtitle}>
              Alege toate variantele care ți se aplică
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            <FormCheckButton
              icon={beatenIcon}
              title="Am fost bătut/ă"
              checked={details.includes('beaten')}
              onPress={() => handleChange('beaten')}
            />
            <FormCheckButton
              icon={abusedIcon}
              title="Am fost violat/ă"
              checked={details.includes('abused')}
              onPress={() => handleChange('abused')}
            />
            <FormCheckButton
              icon={sedatedIcon}
              title="Am fost sedat/ă"
              checked={details.includes('sedated')}
              onPress={() => handleChange('sedated')}
            />
            <FormCheckButton
              icon={punishedIcon}
              title="Am fost legat/ă"
              checked={details.includes('punished')}
              onPress={() => handleChange('punished')}
            />
            <FormCheckButton
              title="Altceva"
              icon={sufferedIcon}
              checked={details.includes('other')}
              onPress={() => handleChange('other')}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <ScreenActions
          nextEnabled={nextEnabled}
          onNext={handleNext}
        />
      </View>
    </ScreenContainer>
  );
};

export default ComplaintDetailsScreen;

const styles = ScaledSheet.create({
  ...style,
  optionsContainer: {
    marginTop: '28@vs',
  },
});
