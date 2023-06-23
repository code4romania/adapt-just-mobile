import React from 'react';
import { View } from 'react-native';

import {
  alarmIcon,
  askHelpIcon,
  documentIcon,
  aboutAppIcon,
  handShakeIcon,
} from '~/assets/images';
import useEmergency from '~/hooks/use-emergency';

import HomeMenuItem from './HomeMenuItem';

const HomeMenu = ({
  navigation,
  onComplaint,
}) => {
  const { callEmergency } = useEmergency();

  // const navigateComplaint = () => {
  //   navigation.navigate('Complaint', {
  //     screen: 'ComplaintVictim',
  //   });
  // };

  const navigateArticles = () => {
    // navigation.navigate('Articles');
  };

  const navigateResources = () => {
    navigation.navigate('Resources');
  };

  return (
    <View>
      <HomeMenuItem
        position={1}
        icon={askHelpIcon}
        title="Cere ajutor"
        // onPress={navigateComplaint}
        onPress={onComplaint}
      />
      <HomeMenuItem
        position={2}
        title="Informații"
        icon={documentIcon}
        onPress={navigateArticles}
      />
      <HomeMenuItem
        position={3}
        icon={handShakeIcon}
        title="Resurse de sprijin"
        onPress={navigateResources}
      />
      <HomeMenuItem
        position={4}
        icon={aboutAppIcon}
        title="Despre aplicație"
      />
      <HomeMenuItem
        position={5}
        icon={alarmIcon}
        showArrow={false}
        title="Sună la 112"
        onPress={callEmergency}
      />
    </View>
  );
};

export default HomeMenu;
