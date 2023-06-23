import React, {
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import RenderHtml, {
  defaultSystemFonts,
} from 'react-native-render-html';
import {
  s,
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import useWithReducer from '~/hooks/use-with-reducer';
import useLoadingView from '~/hooks/use-loading-view';
import { getResource } from '~/services/resources-service';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const systemFonts = [
  ...defaultSystemFonts,
  'EncodeSans-Bold',
  'EncodeSans-Regular',
];

const listenText = [
  'Sfaturi avocat',
];

const initialState = {
  lawyer: null,
  loading: true,
};

const ResourcesLawyerScreen = ({
  route,
}) => {
  const { lawyerId } = route.params;
  const [state, setState] = useWithReducer(initialState);

  const { width } = useWindowDimensions();
  const contentWidth = width - s(48);

  useLoadingView(state.loading);

  const hasLawyer = !!state.lawyer;
  const showNoResults = !state.loading && !hasLawyer;

  const lText = useMemo(() => {
    let text = [...listenText];

    if (showNoResults) {
      text.push('Nu s-a încărcat sfatul avocatului');
    }

    if (hasLawyer && state.lawyer?.content) {
      // add a period after every closing tag
      let content = state.lawyer.content.replace(/<\/[^>]+>/g, '$&.');

      // remove all html tags and spaces &nbsp;
      content = content.replace(/(<([^>]+)>)/ig, '').replace(/&nbsp;/g, '');
      
      text = [
        ...text,
        content.split('.').filter((c) => c !== ''),
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
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              Nu s-a încărcat sfatul avocatului
            </Text>
          </View>
        )}

        {hasLawyer && (
          <>
            {!!state.lawyer.content && (
              <View style={styles.content}>
                <RenderHtml
                  tagsStyles={tagStyles}
                  systemFonts={systemFonts}
                  contentWidth={contentWidth}
                  source={{ html: state.lawyer.content }}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ResourcesLawyerScreen;

const tagStyles = {
  h1: {
    color: '#111827',
    fontSize: ms(24),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h2: {
    color: '#111827',
    fontSize: ms(21),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h3: {
    color: '#111827',
    fontSize: ms(18),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h4: {
    color: '#111827',
    fontSize: ms(16),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h5: {
    color: '#111827',
    fontSize: ms(14),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h6: {
    color: '#111827',
    fontSize: ms(12),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  p: {
    color: '#111827',
    fontSize: ms(19),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Regular',
  },
  img: {
    overflow: 'hidden',
    borderRadius: ms(8),

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
};

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
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    color: '#333333',
    fontSize: '17@ms',
    lineHeight: '24@ms',
    textAlign: 'center',
    fontFamily: 'EncodeSans-Medium',
  },
});
