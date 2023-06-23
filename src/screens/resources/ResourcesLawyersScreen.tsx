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
import ResourcesLawyers from '~/components/resources/ResourcesLawyers';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Resurse de sprijin',
  'Sfaturi avocat',
];

const initialState = {
  lawyers: [],
  loading: true,
};

const ResourcesLawyersScreen = ({
  navigation,
}) => {
  const [state, setState] = useWithReducer(initialState);

  useLoadingView(state.loading);

  const lText = useMemo(() => {
    const text = [...listenText];

    const hasLawyers = state.lawyers.length > 0;
    const showNoResults = !state.loading && !hasLawyers;

    if (showNoResults) {
      text.push('Nu există sfaturi avocat');
    }

    if (hasLawyers) {
      state.lawyers.forEach((lawyer) => {
        text.push(`${lawyer.name}`);
      });
    }

    return text;
  }, [
    state.loading,
    state.lawyers,
  ]);

  useEffect(() => {
    getLawyers();
  }, []);

  const getLawyers = async () => {
    try {
      const response = await getResources('lawyer');
      const lawyers = response.data;
      
      setState({
        lawyers,
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
            title="Sfaturi avocat"
          />
        </View>

        <View style={styles.resourcesContainer}>
          <ResourcesLawyers
            loading={state.loading}
            navigation={navigation}
            lawyers={state.lawyers}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ResourcesLawyersScreen;

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
