import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters/extend';

import AppTab from '../tab/AppTab';
import HomeButton from '../buttons/HomeButton';
import BackgroundGradient from './BackgroundGradient';

const ScreenContainer = ({
  children,
  showTab = true,
  listenText = [],
  showHomeButton = false,
}) => {
  return (
    <BackgroundGradient>
      <SafeAreaView
        edges={['top']}
        style={styles.container}
      >
        {showHomeButton && (
          <View style={styles.buttonContainer}>
            <HomeButton />
          </View>
        )}

        {children}
      </SafeAreaView>

      {showTab && (
        <AppTab listenText={listenText} />
      )}
    </BackgroundGradient>
  );
};

export default ScreenContainer;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: '35@vs',
    flexDirection: 'row',
    paddingBottom: '5@vs',
    marginHorizontal: '30@s',
  },
});
