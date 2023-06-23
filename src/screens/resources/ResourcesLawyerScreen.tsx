import React, {
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import { getHtmlToArray } from '~/utils/html';
import useWithReducer from '~/hooks/use-with-reducer';
import useLoadingView from '~/hooks/use-loading-view';
import { getResource } from '~/services/resources-service';

import ListEmpty from '~/components/shared/screens/ListEmpty';
import HomeButton from '~/components/shared/buttons/HomeButton';
import HtmlContent from '~/components/shared/screens/HtmlContent';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Sfaturi avocat',
];

const initialState = {
  lawyer: null,
  loading: true,
};

const emptyText = 'Nu s-a găsit sfatul avocatului';

const ResourcesLawyerScreen = ({
  route,
}) => {
  const { lawyerId } = route.params;
  const [state, setState] = useWithReducer(initialState);

  useLoadingView(state.loading);

  const hasLawyer = !!state.lawyer;
  const showNoResults = !state.loading && !hasLawyer;

  const showContent = !!state.lawyer?.content || false;

  const lText = useMemo(() => {
    let text = [...listenText];

    if (showNoResults) {
      text.push(emptyText);
    }

    if (hasLawyer && state.lawyer?.content) {
      const { content } = state.lawyer;
      
      text = [
        ...text,
        ...getHtmlToArray(content),
      ];
    }

    return text;
  }, [
    state.lawyer,
    state.loading,
  ]);

  useEffect(() => {
    getLawyer();
  }, []);

  const getLawyer = async () => {
    try {
      const response = await getResource(lawyerId);
      const lawyer = response.data;

      setState({
        lawyer,
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
          screen="ResourcesLawyers"
          screenName="Sfaturi avocat"
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

        {showContent && (
          <View style={styles.content}>
            <HtmlContent
              html={state.lawyer.content}
            />
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ResourcesLawyerScreen;

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
    marginTop: '20@vs',
    paddingBottom: '20@vs',
  },
  contentText: {
    color: '#111827',
    fontSize: '19@ms',
    lineHeight: '27@ms',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Regular',
  },
});
