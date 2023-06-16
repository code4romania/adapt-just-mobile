import React, {
  useEffect,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import useWithReducer from '~/hooks/use-with-reducer';
import useLoadingView from '~/hooks/use-loading-view';
import { getArticles } from '~/services/articles-service';

import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const initialState = {
  articles: [],
  loading: true,
};

const listenText = [];

const ArticlesScreen = ({
  navigation,
}) => {
  const [state, setState] = useWithReducer(initialState);

  useEffect(() => {
    getArticlesAsync();
  }, []);

  // catalin.iacob@web-group.ro
  // password

  const getArticlesAsync = async () => {
    try {
      const response = await getArticles();
      // console.log('response');
      // console.log(response);

      setState({
      //   articles,
        loading: false,
      });
    } catch (error) {
      // console.log('error');
      // console.log(error);

      setState({
        loading: false,
      });
    }
  };

  return (
    <ScreenContainer
      showHomeButton
      listenText={listenText}
    >
      <View style={styles.titleContainer}>
        <ScreenTitle
          title="Informații"
        />
      </View>
    </ScreenContainer>
  );
};

export default ArticlesScreen;

const styles = ScaledSheet.create({
  titleContainer: {
    paddingHorizontal: '24@s',
  },
});
