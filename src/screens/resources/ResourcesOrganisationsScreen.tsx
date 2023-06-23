import React, {
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import useWithReducer from '~/hooks/use-with-reducer';
import useLoadingView from '~/hooks/use-loading-view';
import { getResources } from '~/services/resources-service';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';
import ResourcesOrganisations from '~/components/resources/ResourcesOrganisations';

const listenText = [
  'Resurse de sprijin',
  'Organizații',
];

const initialState = {
  loading: true,
  organisations: [],
};

const emptyText = 'Nu s-au găsit organizații';

const ResourcesOrganisationsScreen = ({
  navigation,
}) => {
  const [state, setState] = useWithReducer(initialState);

  useLoadingView(state.loading);

  const lText = useMemo(() => {
    const text = [...listenText];

    const hasOrganisations = state.organisations.length > 0;
    const showNoResults = !state.loading && !hasOrganisations;

    if (showNoResults) {
      text.push(emptyText);
    }

    if (hasOrganisations) {
      state.organisations.forEach((organisation) => {
        text.push(`${organisation.name}`);
      });
    }

    return text;
  }, [
    state.loading,
    state.organisations,
  ]);

  useEffect(() => {
    getOrganisations();
  }, []);

  const getOrganisations = async () => {
    try {
      const response = await getResources('organisation');
      const organisations = response.data;
      
      setState({
        organisations,
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
            title="Organizații"
          />
        </View>

        <View style={styles.resourcesContainer}>
          <ResourcesOrganisations
            emptyText={emptyText}
            loading={state.loading}
            navigation={navigation}
            organisations={state.organisations}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ResourcesOrganisationsScreen;

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
  resourcesContainer: {
    flex: 1,
    marginTop: '34@vs',
    paddingHorizontal: '30@s',
  },
});
