import React from 'react';
import { View } from 'react-native';

import Article from './Article';
import ListEmpty from '~/components/shared/screens/ListEmpty';

const Articles = ({
  navigation,
  articles = [],
  emptyText = '',
  loading = false,
}) => {
  const hasArticles = articles.length > 0;
  const showNoResults = !loading && !hasArticles;

  return (
    <View style={{ flex: 1 }}>
      {showNoResults && (
        <ListEmpty
          text={emptyText}
        />
      )}

      {hasArticles && (
        <View>
          {articles.map((article) => (
            <Article
              article={article}
              navigation={navigation}
              key={`article_${article.id}`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Articles;
