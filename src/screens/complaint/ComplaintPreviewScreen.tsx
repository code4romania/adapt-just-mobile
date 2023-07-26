import React, {
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import style from '~/components/complaint/style';
import useLoadingView from '~/hooks/use-loading-view';
import { ComplaintContext } from '~/context/ComplaintContext';

import FormStepper from '~/components/shared/form/FormStepper';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenActions from '~/components/shared/screens/ScreenActions';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenOptions = {
  beaten: 'Am fost bătut sau bătută',
  abused: 'Am fost violat sau violată',
  sedated: 'Am fost sedat sedată',
  punished: 'Am fost legat sau legată',

  move: 'Vreau să fiu mutat mutată la',
  evaluation: 'Vreau să fiu evaluat evaluată din nou',
};

const options = {
  beaten: 'Am fost bătut/ă',
  abused: 'Am fost violat/ă',
  sedated: 'Am fost sedat/ă',
  punished: 'Am fost legat/ă',

  move: 'Vreau să fiu mutat/ă la',
  evaluation: 'Vreau să fiu evaluat/ă din nou',
};

const listenText = [
  'Pasul :step din :steps',
  'Plângerea ta',
  'Verifică conținutul plângerii și când ești sigur sigură că vrei să o trimiți, apasă trimite. Odată trimisă, ea va ajunge direct la ',
];

const ComplaintPreviewScreen = ({
  navigation,
}) => {
  const {
    cnp,
    type,
    name,
    steps,
    reason,
    victim,
    details,
    uploads,
    location,
    locationName,
    locationToName,
    institutions,
    institutionsLoading,
    getInstitutionsAsync,
  } = useContext(ComplaintContext);

  const step = steps - 2;

  useLoadingView(institutionsLoading);

  useEffect(() => {
    getInstitutionsAsync();
  }, []);

  const getDetailsText = useCallback((detail) => {
    if (detail !== 'other') {
      let text = options?.[detail] || '';
      if (text && type === 'move') {
        if (locationToName) {
          text = `${text} ${locationToName}`;
        } else {
          text = `${text} alt centru`;
        }
      }

      return text;
    } else {
      return reason;
    }
  }, []);

  const getListenDetailsText = useCallback((detail) => {
    if (detail !== 'other') {
      let text = listenOptions?.[detail] || '';
      if (text && type === 'move') {
        if (locationToName) {
          text = `${text} ${locationToName}`;
        } else {
          text = `${text} alt centru`;
        }
      }

      return text;
    } else {
      return reason;
    }
  }, []);

  const lText = useMemo(() => {
    const text = [...listenText];
    text[0] = `${text[0].replace(':step', step).replace(':steps', steps)}`;
    text[2] = `${text[2]} ${institutions}`;

    text.push(`Mă numesc ${name} `);
    if (cnp) {
      const newCnp = `${cnp.split('').join(' ')}`;
      text.push(`, C N P, ${newCnp}`);
    }

    if (victim === 'other') {
      let victimText = 'și declar că';
      if (locationName) {
        victimText = `${victimText} în ${locationName}`;
      }

      victimText = `${victimText} s-au întâmplat următoarele`;

      text.push(victimText);
      text.push(reason);
    } else {
      let victimText = '';

      if (location?.city_label || locationName) {
        victimText = ', mă aflu ';
        if (location?.city_label) {
          victimText = `${victimText} în ${location.city_label}`;
        }
        if (locationName) {
          victimText = `${victimText} în ${locationName}`;
        }
      }

      victimText = `${victimText} și declar că:`;
      text.push(victimText);

      details.forEach((detail) => {
        let dText = getListenDetailsText(detail);
        text.push(dText);
      });

      if (type === 'move' && !!reason) {
        text.push(`Motivul pentru care vreau să mă mut este ${reason}`);
      }
    }

    text.push('Solicit ca datele mele personale să nu devină publice ca urmare a acestei plângeri, a cărei soluționare o cer.');

    if (uploads.length > 0) {
      text.push(`Am atașat plângerii ${uploads.length} fișier${uploads.length > 1 ? 'e' : ''} cu dovezi.`);
    }

    text.push('Înapoi');
    text.push('Continuă');

    return text;
  }, [institutions]);

  const handleNext = () => {
    navigation.navigate('ComplaintSignature');
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
            step={step}
            steps={steps}
          />

          <View style={styles.title}>
            <ScreenTitle
              marginTop={0}
              title="Plângerea ta"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.infoText}>
              Verifică conținutul plângerii și când ești sigur/ă că vrei să o trimiți, apasă <Text style={styles.infoTextBold}>Trimite.</Text> Odată trimisă, ea va ajunge direct la <Text style={styles.infoTextBold}>{institutions}</Text>
            </Text>
          </View>

          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Mă numesc <Text style={styles.summaryHighlight}>{name}</Text>
              {!!cnp && (
                <>
                  {', CNP '} <Text style={styles.summaryHighlight}>{cnp}</Text>
                </>
              )}

              {victim === 'other' && (
                <>
                  {' și declar că'}
                  {!!locationName && (
                    <>
                      {' în '}
                      <Text style={styles.summaryTextBold}>{locationName}</Text>
                    </>
                  )}
                  {' s-au întâmplat următoarele'}
                </>
              )}

              {victim !== 'other' && (
                <>
                  {(!!location?.city_label || !!locationName) && ', mă aflu'}
                  {!!location?.city_label && (
                    <>
                      {' în '}
                      <Text style={styles.summaryTextBold}>{location.city_label}</Text>
                    </>
                  )}
                  {!!locationName && (
                    <>
                      {' în '}
                      <Text style={styles.summaryTextBold}>{locationName}</Text>
                    </>
                  )}
                  {' și declar că:'}
                </>
              )}
            </Text>

            <View style={styles.listContainer}>
              {details.map((detail, i) => (
                <View
                  key={`detail${i}`}
                  style={styles.listItem}
                >
                  <View style={styles.bullet} />
                  <Text style={styles.summaryText}>
                    <Text style={styles.summaryHighlight}>
                      {getDetailsText(detail).trim()}
                    </Text>
                    {i === details.length - 1 ? '' : ';'}
                  </Text>
                </View>
              ))}

              {victim === 'other' && (
                <View style={styles.listItem}>
                  <View style={styles.bullet} />
                  <Text style={[
                    styles.summaryText,
                    styles.summaryTextBold,
                  ]}>
                    {reason}
                  </Text>
                </View>
              )}
            </View>

            {(type === 'move' && !!reason) && (
              <View style={styles.movingReason}>
                <Text style={styles.summaryText}>
                  Motivul pentru care vreau să mă mut este <Text style={styles.summaryTextBold}>{reason}</Text>
                </Text>
              </View>
            )}

            <Text style={styles.summaryText}>
              Solicit ca datele mele personale să nu devină publice ca urmare a acestei plângeri, a cărei soluționare o cer.
            </Text>

            {uploads.length > 0 && (
              <View style={styles.uploadsContainer}>
                <Text style={styles.summaryText}>
                  Am atașat plângerii următoarele dovezi:
                </Text>

                <View style={styles.listContainer}>
                  {uploads.map((file, i) => (
                    <View
                      key={`file_${i}`}
                      style={[
                        styles.listItem,
                        { marginBottom: 4 },
                      ]}
                    >
                      <View style={styles.bullet} />
                      <Text style={styles.summaryText}>
                        {file?.fileName || file?.name || `Fișier ${i + 1}`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <ScreenActions
          nextText="Continuă"
          onNext={handleNext}
        />
      </View>
    </ScreenContainer>
  );
};

export default ComplaintPreviewScreen;

const styles = ScaledSheet.create({
  ...style,
  info: {
    marginTop: '4@vs',
  },
  infoText: {
    color: '#4B5563',
    fontSize: '17@msr',
    lineHeight: '24@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Medium',
  },
  infoTextBold: {
    color: '#111827',
    fontFamily: 'EncodeSans-Bold',
  },
  summary: {
    borderWidth: 1,
    marginTop: '36@vs',
    borderRadius: '4@msr',
    borderColor: '#F59E0B',
    paddingVertical: '21@vs',
    paddingHorizontal: '18@s',
  },
  summaryText: {
    flex: 1,
    color: '#111827',
    fontSize: '16@msr',
    lineHeight: '20@msr',
    letterSpacing: '0.015@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  summaryTextBold: {
    fontFamily: 'EncodeSans-Bold',
  },
  summaryHighlight: {
    color: '#D97706',
    fontFamily: 'EncodeSans-Bold',
  },
  listContainer: {
    marginTop: '20@vs',
    marginBottom: '10@vs',
  },
  listItem: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10@vs',
  },
  bullet: {
    width: '6@msr',
    height: '6@msr',
    borderRadius: '4@msr',
    marginHorizontal: '10@s',
    backgroundColor: '#111827',
  },
  uploadsContainer: {
    marginTop: '15@vs',
  },
  movingReason: {
    marginBottom: '20@vs',
  },
});
