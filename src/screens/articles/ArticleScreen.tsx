import React, {
  useMemo,
  useEffect,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { getHtmlToArray } from '~/utils/html';
import { chevronDownIcon } from '~/assets/images';
import useWithReducer from '~/hooks/use-with-reducer';
import useLoadingView from '~/hooks/use-loading-view';
import { getArticle } from '~/services/articles-service';

import ListEmpty from '~/components/shared/screens/ListEmpty';
import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import HtmlContent from '~/components/shared/screens/HtmlContent';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Informații',
];

const initialState = {
  article: null,
  loading: true,
  showShortContent: false,
};

const emptyText = 'Nu s-a găsit articolul cu informații';

const ArticleScreen = ({
  route,
  navigation,
}) => {
  const { articleId } = route.params;
  const [state, setState] = useWithReducer(initialState);

  useLoadingView(state.loading);

  const hasArticle = !!state.article;
  const showNoResults = !state.loading && !hasArticle;

  const lText = useMemo(() => {
    let text = [...listenText];

    if (showNoResults) {
      text.push(emptyText);
    }

    if (hasArticle) {
      text.push(state.article.name);

      if (state.article?.content) {
        const { content } = state.article;
        
        text = [
          ...text,
          ...getHtmlToArray(content),
        ];
      }

      if (state.article?.short_content) {
        if (!state.showShortContent) {
          text.push('Citește textul în format accesibilizat');
        } else {
          text.push('Ascunde textul în format accesibilizat');

          const shortContent = state.article.short_content;
          
          text = [
            ...text,
            ...getHtmlToArray(shortContent),
          ];
        }
      }

      text.push('Ai pățit și tu asta?');
      text.push('Fă o reclamație');
    }

    return text;
  }, [
    state.article,
    state.loading,
    state.showShortContent,
  ]);

  useEffect(() => {
    getArticleAsync();
  }, []);

  const getArticleAsync = async () => {
    try {
      const response = await getArticle(articleId);
      const article = response.data;

      setState({
        article,
        loading: false,
      });
    } catch (error) {
      setState({ loading: false }); 
    }
  };

  const toggleShortContent = () => {
    const showShortContent = !state.showShortContent;

    setState({ showShortContent });
  };

  const navigateComplaint = () => {
    navigation.navigate('Complaint');
  };

  return (
    <ScreenContainer
      listenText={lText}
      showHomeButton={false}
    >
      <View style={styles.buttonContainer}>
        <HomeButton
          screen="Articles"
          screenName="Informații"
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

        {hasArticle && (
          <>
            <ScreenTitle
              fontSize={ms(20)}
              title={state.article.name}
            />

            {!!state.article.content && (
              <View style={styles.content}>
                <HtmlContent
                  html={state.article.content}
                />
              </View>
            )}

            {!!state.article.short_content && (
              <View style={styles.shortContent}>
                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={toggleShortContent}
                >
                  <SvgXml
                    width={ms(16)}
                    height={ms(16)}
                    xml={chevronDownIcon}
                    style={
                      state.showShortContent && {
                        transform: [{ rotate: '180deg' }],
                      }
                    }
                  />

                  <Text
                    numberOfLines={1}
                    style={styles.expandButtonText}
                  >
                    {`${state.showShortContent ? 'Ascunde' : 'Citește'} textul în format accesibilizat`}
                  </Text>
                </TouchableOpacity>

                {state.showShortContent && (
                  <HtmlContent
                    html={state.article.short_content}
                  />
                )}
              </View>
            )}

            <View style={styles.complaint}>
              <Text style={styles.complaintLabel}>
                Ai pățit și tu asta?
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={styles.complaintButton}
                  onPress={navigateComplaint}
                >
                  <Text style={styles.complaintButtonText}>
                    Fă o reclamație
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default ArticleScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '30@vs',
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
  },
  contentText: {
    color: '#111827',
    fontSize: '19@ms',
    lineHeight: '27@ms',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Regular',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: '1@msr',
    paddingVertical: '3@vs',
    paddingHorizontal: '5@s',
    borderTopColor: '#1F2937',
  },
  expandButtonText: {
    color: '#1F2937',
    marginLeft: '8@s',
    fontSize: '14@msr',
    lineHeight: '32@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-SemiBold',
  },
  shortContent: {
    marginTop: '20@vs',
    borderBottomWidth: '1@msr',
    borderBottomColor: '#1F2937',
  },
  complaint: {
    marginTop: '30@vs',
  },
  complaintLabel: {
    color: '#111827',
    fontSize: '20@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-SemiBold',
  },
  complaintButton: {
    marginTop: '16@vs',
    borderRadius: '8@msr',
    paddingVertical: '12@vs',
    paddingHorizontal: '24@s',
    backgroundColor: '#FBBF24',
  },
  complaintButtonText: {
    color: '#111827',
    fontSize: '14@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
});
