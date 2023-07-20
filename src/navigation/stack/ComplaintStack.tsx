import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import { ComplaintProvider } from '~/context/ComplaintContext';

// Screens
import ComplaintDataScreen from '~/screens/complaint/ComplaintDataScreen';
import ComplaintTypeScreen from '~/screens/complaint/ComplaintTypeScreen';
import ComplaintVictimScreen from '~/screens/complaint/ComplaintVictimScreen';
import ComplaintDisclaimerScreen from '~/screens/complaint/ComplaintDisclaimerScreen';

// Form screens
import ComplaintCNPScreen from '~/screens/complaint/ComplaintCNPScreen';
import ComplaintNameScreen from '~/screens/complaint/ComplaintNameScreen';
import ComplaintProofScreen from '~/screens/complaint/ComplaintProofScreen';
import ComplaintReasonScreen from '~/screens/complaint/ComplaintReasonScreen';
import ComplaintPreviewScreen from '~/screens/complaint/ComplaintPreviewScreen';
import ComplaintSuccessScreen from '~/screens/complaint/ComplaintSuccessScreen';
import ComplaintUploadsScreen from '~/screens/complaint/ComplaintUploadsScreen';
import ComplaintDetailsScreen from '~/screens/complaint/ComplaintDetailsScreen';
import ComplaintLocationScreen from '~/screens/complaint/ComplaintLocationScreen';
import ComplaintSignatureScreen from '~/screens/complaint/ComplaintSignatureScreen';
import ComplaintLocationToScreen from '~/screens/complaint/ComplaintLocationToScreen';
import ComplaintOtherReasonScreen from '~/screens/complaint/ComplaintOtherReasonScreen';
import ComplaintMovingReasonScreen from '~/screens/complaint/ComplaintMovingReasonScreen';

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

const Stack = createStackNavigator();

const ComplaintStack = () => {
  return (
    <ComplaintProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionScreenOptions,
        }}
        initialRouteName="ComplaintVictim"
      >
        <Stack.Screen
          name="ComplaintVictim"
          component={ComplaintVictimScreen}
        />
        <Stack.Screen
          name="ComplaintType"
          component={ComplaintTypeScreen}
        />
        <Stack.Screen
          name="ComplaintDisclaimer"
          component={ComplaintDisclaimerScreen}
        />
        <Stack.Screen
          name="ComplaintData"
          component={ComplaintDataScreen}
        />
        <Stack.Screen
          name="ComplaintName"
          component={ComplaintNameScreen}
        />
        <Stack.Screen
          name="ComplaintCNP"
          component={ComplaintCNPScreen}
        />
        <Stack.Screen
          name="ComplaintLocation"
          component={ComplaintLocationScreen}
        />
        <Stack.Screen
          name="ComplaintLocationTo"
          component={ComplaintLocationToScreen}
        />
        <Stack.Screen
          name="ComplaintMovingReason"
          component={ComplaintMovingReasonScreen}
        />
        <Stack.Screen
          name="ComplaintDetails"
          component={ComplaintDetailsScreen}
        />
        <Stack.Screen
          name="ComplaintReason"
          component={ComplaintReasonScreen}
        />
        <Stack.Screen
          name="ComplaintOtherReason"
          component={ComplaintOtherReasonScreen}
        />
        <Stack.Screen
          name="ComplaintProof"
          component={ComplaintProofScreen}
        />
        <Stack.Screen
          name="ComplaintUploads"
          component={ComplaintUploadsScreen}
        />
        <Stack.Screen
          name="ComplaintPreview"
          component={ComplaintPreviewScreen}
        />
        <Stack.Screen
          name="ComplaintSignature"
          component={ComplaintSignatureScreen}
        />
        <Stack.Screen
          name="ComplaintSuccess"
          component={ComplaintSuccessScreen}
        />
      </Stack.Navigator>
    </ComplaintProvider>
  );
};

export default ComplaintStack;
