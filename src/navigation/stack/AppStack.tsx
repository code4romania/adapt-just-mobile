import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import { LocationsProvider } from '~/context/LocationsContext';

import ComplaintStack from './ComplaintStack';
import HomeScreen from '~/screens/HomeScreen';
import ArticlesScreen from '~/screens/articles/ArticlesScreen';

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <LocationsProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionScreenOptions,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Complaint"
          component={ComplaintStack}
        />
        <Stack.Screen
          name="Articles"
          component={ArticlesScreen}
        />
      </Stack.Navigator>
    </LocationsProvider>
  );
};

export default AppStack;
