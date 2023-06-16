import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import AppNavigator from '~/navigation';
import { NetInfoProvider } from '~/context/NetInfoContext';
import { IntroProvider } from './src/context/IntroContext';
import { ListenProvider } from './src/context/ListenContext';
import { HideViewProvider } from './src/context/HideViewContext';
import { LoadingViewProvider } from './src/context/LoadingViewContext';

const App = () => {
  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
    >
      <HideViewProvider>
        <ListenProvider>
          <IntroProvider>
            <ActionSheetProvider>
              <LoadingViewProvider>
                <NetInfoProvider>
                  <AppNavigator />
                </NetInfoProvider>
              </LoadingViewProvider>
            </ActionSheetProvider>
          </IntroProvider>
        </ListenProvider>
      </HideViewProvider>
    </SafeAreaProvider>
  );
};

export default App;
