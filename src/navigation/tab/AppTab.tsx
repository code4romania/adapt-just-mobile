import React, {
  useCallback,
} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Colors } from '~/style';
import AppTabBar from './AppTabBar';
import HomeScreen from '../../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const Hide = () => null;
const Listen = () => null;

const AppTab = () => {
  const renderTabBar = useCallback(props => {
    return <AppTabBar {...props} />;
  }, []);

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      sceneContainerStyle={{
        backgroundColor: 'transparent',
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => null,
        }}
      /> */}

      <Tab.Screen
        name="Listen"
        component={Listen}
        options={{
          tabBarLabel: 'Ascultă',
          header: () => null,
        }}
      />
      <Tab.Screen
        name="Hide"
        component={Hide}
        options={{
          tabBarLabel: 'Ascunde',
          header: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTab;
