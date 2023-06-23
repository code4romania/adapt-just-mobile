import React, {
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import useWithReducer from '~/hooks/use-with-reducer';
import useLoadingView from '~/hooks/use-loading-view';
import { getResources } from '~/services/resources-service';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';
import ResourcesPhoneNumbers from '~/components/resources/ResourcesPhoneNumbers';

const initialState = {
  loading: true,
  phoneNumbers: [],
};

const listenText = [
  'Resurse de sprijin',
  'Numere de telefon',
  'Apasă pe numărul de telefon ca să suni:',
];

const emptyText = 'Nu s-au găsit numere de telefon';

const ResourcesPhoneNumbersScreen = () => {
  const [state, setState] = useWithReducer(initialState);

  useLoadingView(state.loading);

  const lText = useMemo(() => {
    const text = [...listenText];

    const hasPhones = state.phoneNumbers.length > 0;
    const showNoResults = !state.loading && !hasPhones;

    if (showNoResults) {
      text.push(emptyText);
    }

    if (hasPhones) {
      state.phoneNumbers.forEach((phoneNumber) => {
        let { phone } = phoneNumber;

        if (phone.length === 3) {
          phone = phone.replace(/(.)/g, '$1 ');
        }

        text.push(`${phoneNumber.name}: ${phone}`);
      });
    }

    return text;
  }, [
    state.loading,
    state.phoneNumbers,
  ]);

  useEffect(() => {
    getPhoneNumbers();
  }, []);

  const getPhoneNumbers = async () => {
    try {
      const response = await getResources('phone_number');
      const phoneNumbers = response.data;
      
      setState({
        phoneNumbers,
        loading: false,
      });
    } catch (error) {
      setState({ loading: false }); 
    }
  };

  return (
    <ScreenContainer
      listenText={lText}
      showHomeButton={false}
    >
      <View style={styles.buttonContainer}>
        <HomeButton
          screen="Resources"
          screenName="Resurse de sprijin"
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleContainer}>
          <ScreenTitle
            title="Numere de telefon"
          />
          <Text style={styles.subtitle}>
            Apasă pe numărul de telefon ca să suni:
          </Text>
        </View>

        <View style={styles.resourcesContainer}>
          <ResourcesPhoneNumbers
            emptyText={emptyText}
            loading={state.loading}
            phoneNumbers={state.phoneNumbers}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ResourcesPhoneNumbersScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  buttonContainer: {
    marginTop: '35@vs',
    flexDirection: 'row',
    paddingBottom: '5@vs',
    marginHorizontal: '30@s',
  },
  titleContainer: {
    paddingHorizontal: '24@s',
  },
  subtitle: {
    color: '#333333',
    fontSize: '19@msr',
    lineHeight: '26@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Medium',
  },
  resourcesContainer: {
    flex: 1,
    marginTop: '34@vs',
    paddingHorizontal: '30@s',
  },
});
