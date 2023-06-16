import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import HideIntroScreen from '~/screens/intro/HideIntroScreen';
import ComplaintIntroScreen from '~/screens/intro/ComplaintIntroScreen';

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const Stack = createStackNavigator();

const IntroStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionScreenOptions,
      }}
      initialRouteName="HideIntro"
    >
      <Stack.Screen name="HideIntro" component={HideIntroScreen} />
      <Stack.Screen name="ComplaintIntro" component={ComplaintIntroScreen} />
    </Stack.Navigator>
  );
};

export default IntroStack;
