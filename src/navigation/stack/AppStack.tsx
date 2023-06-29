import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import { LocationsProvider } from '~/context/LocationsContext';

import HomeScreen from '~/screens/HomeScreen';
import ComplaintStack from './ComplaintStack';

import ArticleScreen from '~/screens/articles/ArticleScreen';
import ArticlesScreen from '~/screens/articles/ArticlesScreen';

import ResourcesScreen from '~/screens/resources/ResourcesScreen';
import ResourcesLawyerScreen from '~/screens/resources/ResourcesLawyerScreen';
import ResourcesLawyersScreen from '~/screens/resources/ResourcesLawyersScreen';
import ResourcesPhoneNumbersScreen from '~/screens/resources/ResourcesPhoneNumbersScreen';
import ResourcesOrganisationScreen from '~/screens/resources/ResourcesOrganisationScreen';
import ResourcesOrganisationsScreen from '~/screens/resources/ResourcesOrganisationsScreen';

import AboutAppScreen from '~/screens/about/AboutAppScreen';
import AboutHideScreen from '~/screens/about/AboutHideScreen';
import AboutHelpScreen from '~/screens/about/AboutHelpScreen';
import HowToUseAppScreen from '~/screens/about/HowToUseAppScreen';
import AboutListenScreen from '~/screens/about/AboutListenScreen';
import AboutProjectScreen from '~/screens/about/AboutProjectScreen';
import AboutComplaintScreen from '~/screens/about/AboutComplaintScreen';
import AboutInformationScreen from '~/screens/about/AboutInformationScreen';
import FundingAndPartnersScreen from '~/screens/about/FundingAndPartnersScreen';

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
          name="Article"
          component={ArticleScreen}
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

        <Stack.Screen
          name="AboutApp"
          component={AboutAppScreen}
        />
        <Stack.Screen
          name="AboutProject"
          component={AboutProjectScreen}
        />
        <Stack.Screen
          name="FundingAndPartners"
          component={FundingAndPartnersScreen}
        />
        <Stack.Screen
          name="HowToUseApp"
          component={HowToUseAppScreen}
        />
        <Stack.Screen
          name="AboutListen"
          component={AboutListenScreen}
        />
        <Stack.Screen
          name="AboutHide"
          component={AboutHideScreen}
        />
        <Stack.Screen
          name="AboutComplaint"
          component={AboutComplaintScreen}
        />
        <Stack.Screen
          name="AboutHelp"
          component={AboutHelpScreen}
        />
        <Stack.Screen
          name="AboutInformation"
          component={AboutInformationScreen}
        />
      </Stack.Navigator>
    </LocationsProvider>
  );
};

export default AppStack;
