import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import { LocationsProvider } from '~/context/LocationsContext';

import ComplaintStack from './ComplaintStack';
import HomeScreen from '~/screens/HomeScreen';
import ArticlesScreen from '~/screens/articles/ArticlesScreen';

import ResourcesScreen from '~/screens/resources/ResourcesScreen';
import ResourcesLawyerScreen from '~/screens/resources/ResourcesLawyerScreen';
import ResourcesLawyersScreen from '~/screens/resources/ResourcesLawyersScreen';
import ResourcesPhoneNumbersScreen from '~/screens/resources/ResourcesPhoneNumbersScreen';
import ResourcesOrganisationScreen from '~/screens/resources/ResourcesOrganisationScreen';
import ResourcesOrganisationsScreen from '~/screens/resources/ResourcesOrganisationsScreen';

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

        <Stack.Screen
          name="Resources"
          component={ResourcesScreen}
        />
        <Stack.Screen
          name="ResourcesPhoneNumbers"
          component={ResourcesPhoneNumbersScreen}
        />
        <Stack.Screen
          name="ResourcesOrganisations"
          component={ResourcesOrganisationsScreen}
        />
        <Stack.Screen
          name="ResourcesOrganisation"
          component={ResourcesOrganisationScreen}
        />
        <Stack.Screen
          name="ResourcesLawyers"
          component={ResourcesLawyersScreen}
        />
        <Stack.Screen
          name="ResourcesLawyer"
          component={ResourcesLawyerScreen}
        />
      </Stack.Navigator>
    </LocationsProvider>
  );
};

export default AppStack;
