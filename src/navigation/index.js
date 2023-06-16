import React, {
  useContext,
  useCallback,
} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import { Colors } from '~/style';
import { IntroContext } from '~/context/IntroContext';

import AppStack from './stack/AppStack';
import IntroStack from './stack/IntroStack';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

const AppNavigator = () => {
  const {
    isIntro,
    introCheck,
  } = useContext(IntroContext);

  const renderContent = useCallback(() => {
    if (!introCheck) {
      return null;
    }

    if (isIntro) {
      return (
        <IntroStack />
      );
    }

    return (
      <AppStack />
    );
  }, [isIntro, introCheck]);

  return (
    <NavigationContainer
      theme={AppTheme}
    >
      {renderContent()}
    </NavigationContainer>
  );
};

export default AppNavigator;
