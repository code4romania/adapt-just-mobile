import React, {
  useRef,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  complaintHurtIcon,
  complaintMoveIcon,
  complaintEvaluationIcon,
} from '~/assets/images';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormButton from '~/components/shared/buttons/FormButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Ecran principal',
  'Ce problemă ai',
  'Mi-a făcut cineva rău',
  'Am fost bătut, abuzat sexual, pedepsit, închis, legat sau altceva',
  'Vreau să mă mut',
  'Vreau să fiu mutat într-un alt centru sau spital',
  'Vreau la judecător',
  'Vreau să ies de sub interdicție',
  'înapoi',
  'Continuă',
];

const ComplaintTypeScreen = ({
  navigation,
}) => {
  const complaintRef = useRef('');

  const {
    type,
    victim,
    details,
    setType,
    setComplaint,
    resetComplaint,
  } = useContext(ComplaintContext);

  const nextEnabled = type !== '';
  const isHurt = type === 'hurt';
  const isMove = type === 'move';
  const isEvaluation = type === 'evaluation';

  useEffect(() => {
    const getComplaint = async () => {
      const complaint = await AsyncStorage.getItem('@complaint');

      if (!complaint) return;
      complaintRef.current = complaint;
    };

    getComplaint();
  }, []);

  const handleType = (value) => {
    if (value === type) {
      setType('');
    } else {
      setType(value);
    }
  };

  const handleNext = async () => {
    let screen = 'ComplaintDisclaimer';

    if (complaintRef.current) {
      const complaint = JSON.parse(complaintRef.current);
      const { step } = complaint;

      if (complaint?.type === type) {
        if (complaint?.disclaimerShown) {
          screen = 'ComplaintData';
        }

        if (complaint?.dataShown) {
          screen = 'ComplaintName';
        }

        setComplaint(complaint);
      } else {
        await resetComplaint({
          type,
          victim,
          details,
          dataShown: false,
          disclaimerShown: false,
        });
      }

      navigation.navigate(screen, {
        step,
        type,
      });

      return;
    }

    navigation.navigate(screen);
  };

  return (
    <ScreenContainer
      showHomeButton
      listenText={listenText}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleContainer}>
          <ScreenTitle
            title="Ce problemă ai?"
          />
        </View>

        <View style={styles.formContainer}>
          <FormButton
            checked={isHurt}
            icon={complaintHurtIcon}
            title="Mi-a făcut cineva rău"
            subtitle="Am fost bătut, abuzat sexual, pedepsit, închis, legat sau altceva"
            onPress={() => handleType('hurt')}
          />
          <FormButton
            checked={isMove}
            icon={complaintMoveIcon}
            title="Vreau să mă mut"
            subtitle="Vreau să fiu mutat într-un alt centru sau spital"
            onPress={() => handleType('move')}
          />
          <FormButton
            checked={isEvaluation}
            icon={complaintEvaluationIcon}
            title="Vreau la judecător"
            subtitle="Vreau să ies de sub interdicție"
            onPress={() => handleType('evaluation')}
          />
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

export default ComplaintTypeScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: '16@s',
  },
  titleContainer: {
    marginHorizontal: '12@s',
  },
  formContainer: {
    marginTop: '30@vs',
  },
  actionsContainer: {
    marginTop: '5@vs',
    marginBottom: '30@vs',
    paddingHorizontal: '16@s',
  },
});
