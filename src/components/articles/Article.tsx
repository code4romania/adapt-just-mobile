import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

import ArrowRightIcon from '~/components/shared/icons/ArrowRightIcon';

const Article = ({
  article,
  navigation,
}) => {
  const handlePress = () => {
    const articleId = article.id;

    navigation.navigate('Article', { articleId });
  };

  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={'#FBBF24'}
      onPress={handlePress}
    >
      <>
        <View style={styles.info}>
          <Text style={styles.title}>
            {article.name}
          </Text>
        </View>

        <ArrowRightIcon />
      </>
    </TouchableHighlight>
  );
};

export default Article;

const styles = ScaledSheet.create({
  container: {
    borderWidth: 2,
    paddingLeft: '26@s',
    paddingRight: '22@s',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '20@vs',
    borderRadius: '8@msr',
    borderColor: '#FBBF24',
    paddingVertical: '22@vs',
    backgroundColor: '#FFFFFF',

    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowColor: '#000000',
  },
  info: {
    flex: 1,
    marginRight: '5@s',
  },
  title: {
    color: '#111827',
    fontSize: '15@msr',
    lineHeight: '18@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Bold',
  },
});
