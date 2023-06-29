import React, {
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import {
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import useWithReducer from '~/hooks/use-with-reducer';
import useLoadingView from '~/hooks/use-loading-view';
import { getResource } from '~/services/resources-service';

import ListEmpty from '~/components/shared/screens/ListEmpty';
import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import PhoneButton from '~/components/shared/buttons/PhoneButton';
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
                <PhoneButton
                  phone={state.organisation.phone}
                  label="Sună pentru a solicita ajutor"
                />
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
});
