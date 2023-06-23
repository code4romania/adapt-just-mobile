import React, {
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  Text,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ms,
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { phoneIcon } from '~/assets/images';
import useWithReducer from '~/hooks/use-with-reducer';
import useLoadingView from '~/hooks/use-loading-view';
import { getResource } from '~/services/resources-service';

import ListEmpty from '~/components/shared/screens/ListEmpty';
import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Organizații',
];

const initialState = {
  loading: true,
  organisation: null,
};

const emptyText = 'Nu s-a găsit organizația';

const ResourcesOrganisationScreen = ({
  route,
}) => {
  const { organisationId } = route.params;
  const [state, setState] = useWithReducer(initialState);

  useLoadingView(state.loading);

  const hasOrganisation = !!state.organisation;
  const showNoResults = !state.loading && !hasOrganisation;

  const lText = useMemo(() => {
    const text = [...listenText];

    if (showNoResults) {
      text.push(emptyText);
    }

    if (hasOrganisation) {
      text.push(state.organisation.name);
    }

    if (state.organisation?.short_content) {
      text.push(state.organisation.short_content);
    }

    if (state.organisation?.phone) {
      let phone = state.organisation.phone;
      if (phone.length === 3) {
        phone = phone.replace(/(.)/g, '$1 ');
      }

      text.push(`Sună pentru a solicita ajutor: ${phone}`);
    }

    return text;
  }, [
    state.loading,
    state.organisation,
  ]);

  useEffect(() => {
    getOrganisation();
  }, []);

  const getOrganisation = async () => {
    try {
      const response = await getResource(organisationId);
      const organisation = response.data;

      setState({
        organisation,
        loading: false,
      });
    } catch (error) {
      setState({ loading: false }); 
    }
  };

  const handlePhonePress = async () => {
    try {
      await Linking.openURL(`tel:${state.organisation.phone}`);
    } catch (error) {}
  };

  return (
    <ScreenContainer
      listenText={lText}
      showHomeButton={false}
    >
      <View style={styles.buttonContainer}>
        <HomeButton
          screenName="Organizații"
          screen="ResourcesOrganisations"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
      >
        {showNoResults && (
          <ListEmpty
            text={emptyText}
          />
        )}

        {hasOrganisation && (
          <>
            <ScreenTitle
              fontSize={ms(20)}
              title={state.organisation.name}
            />

            {!!state.organisation.short_content && (
              <View style={styles.content}>
                <Text style={styles.contentText}>
                  {state.organisation.short_content}
                </Text>
              </View>
            )}

            {!!state.organisation.phone && (
              <View style={styles.phoneContainer}>
                <Text style={styles.phoneTitle}>
                  Sună pentru a solicita ajutor
                </Text>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={styles.phoneButton}
                    onPress={handlePhonePress}
                  >
                    <SvgXml
                      height={vs(16)}
                      xml={phoneIcon}
                      style={styles.phoneIcon}
                    />

                    <Text style={styles.phoneText}>
                      {state.organisation.phone}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ResourcesOrganisationScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: '24@s',
  },
  buttonContainer: {
    marginTop: '35@vs',
    flexDirection: 'row',
    paddingBottom: '5@vs',
    marginHorizontal: '30@s',
  },
  content: {
    marginTop: '16@vs',
  },
  contentText: {
    color: '#111827',
    fontSize: '19@ms',
    lineHeight: '27@ms',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Regular',
  },
  phoneContainer: {
    marginTop: '50@vs',
  },
  phoneTitle: {
    color: '#111827',
    fontSize: '19@ms',
    lineHeight: '27@ms',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Semibold',
  },
  phoneButton: {
    borderWidth: 1,
    marginTop: '8@vs',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '6@msr',
    borderColor: '#D1D5DB',
    backgroundColor: '#FFF',
    paddingVertical: '13@vs',
    paddingHorizontal: '25@s',
  },
  phoneIcon: {
    marginRight: '14@s',
  },
  phoneText: {
    color: '#111827',
    fontSize: '20@msr',
    lineHeight: '27@msr',
    fontFamily: 'EncodeSans-SemiBold',
  },
});
