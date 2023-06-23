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
import { getArticles } from '~/services/articles-service';

import Articles from '~/components/articles/Articles';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const initialState = {
  articles: [],
  loading: true,
};

const listenText = [
  'Ecran principal',
  'Informații',
];

const emptyText = 'Nu s-au găsit informații';

const ArticlesScreen = ({
  navigation,
}) => {
  const [state, setState] = useWithReducer(initialState);

  useLoadingView(state.loading);

  const lText = useMemo(() => {
    const text = [...listenText];

    const hasArticles = state.articles.length > 0;
    const showNoResults = !state.loading && !hasArticles;

    if (showNoResults) {
      text.push(emptyText);
    }

    if (hasArticles) {
      state.articles.forEach((article) => {
        text.push(article.name);
      });
    }

    return text;
  }, [
    state.loading,
    state.articles
  ]);

  useEffect(() => {
    getArticlesAsync();
  }, []);

  const getArticlesAsync = async () => {
    try {
      const response = await getArticles();
      const articles = response.data;

      setState({
        articles,
        loading: false,
      });
    } catch (error) {
      setState({ loading: false });
    }
  };

  return (
    <ScreenContainer
      showHomeButton
      listenText={lText}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.titleContainer}>
          <ScreenTitle
            title="Informații"
          />
        </View>

        <View style={styles.content}>
          <Articles
            emptyText={emptyText}
            navigation={navigation}
            loading={state.loading}
            articles={state.articles}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ArticlesScreen;

const styles = ScaledSheet.create({
  titleContainer: {
    paddingHorizontal: '24@s',
  },
  content: {
    flex: 1,
    paddingTop: '40@vs',
    paddingHorizontal: '28@s',
  },
});
