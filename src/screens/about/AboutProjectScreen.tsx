import React, {
  useMemo,
  useState,
} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import {
  content,
  shortContent,
} from '~/components/about/texts';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';
import ExpandContentButton from '~/components/shared/buttons/ExpandContentButton';

import AboutProjectContent from '~/components/about/AboutProjectContent';
import AboutProjectShortContent from '~/components/about/AboutProjectShortContent';

const listenText = [
  'Înapoi',
  'Despre proiect',
];

const AboutProjectScreen = () => {
  const [showShortContent, setShowShortContent] = useState(false);

  const lText = useMemo(() => {
    let text = [...listenText];

    for (const item of content) {
      text.push(item.replace('/', ''));
    }

    text.push('Citește textul în format accesibilizat');

    if (showShortContent) {
      text.push('Descriere');
      text.push(shortContent[0].replace('/', ''));
      text.push(shortContent[1].replace('/', ''));
    }

    return text;
  }, [showShortContent]);

  const toggleShowShortContent = () => {
    setShowShortContent(!showShortContent);
  };

  return (
    <ScreenContainer
      listenText={lText}
    >
      <View style={styles.buttonContainer}>
        <HomeButton
          screen="AboutApp"
          screenName="Înapoi"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleContainer}>
          <ScreenTitle
            marginTop={vs(25)}
            title="Despre proiect"
          />
        </View>

        <View style={styles.content}>
          <AboutProjectContent />
        </View>

        <View style={styles.shortContent}>
          <ExpandContentButton
            expanded={showShortContent}
            onPress={toggleShowShortContent}
          >
            <AboutProjectShortContent />
          </ExpandContentButton>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AboutProjectScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '20@vs',
  },
  buttonContainer: {
    marginTop: '35@vs',
    flexDirection: 'row',
    paddingBottom: '5@vs',
    marginHorizontal: '30@s',
  },
  titleContainer: {
    paddingHorizontal: '38@s',
  },
  content: {
    marginTop: '25@vs',
    paddingHorizontal: '30@s',
  },
  shortContent: {
    marginTop: '20@vs',
    marginHorizontal: '13@s',
  },
});
