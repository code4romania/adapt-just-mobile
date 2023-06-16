import React, {
  useContext,
  useCallback,
} from 'react';
import { View } from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ListenContext } from '~/context/ListenContext';
import { HideViewContext } from '~/context/HideViewContext';

import AppTabItem from './AppTabItem';

const AppTab = ({
  listenText = [],
}) => {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom || vs(16);

  const {
    handleStop,
    handleListen,
  } = useContext(ListenContext);

  const { setVisible } = useContext(HideViewContext);

  useFocusEffect(
    useCallback(() => {
      handleStop();
    }, []),
  );

  const onListen = () => {
    if (!listenText.length) return;
    handleListen(listenText);
  };

  const handleHide = () => {
    handleStop();
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <AppTabItem
        isListen
        label="Ascultă"
        paddingBottom={paddingBottom}
        onPress={onListen}
      />
      <AppTabItem
        isHide
        label="Ascunde"
        paddingBottom={paddingBottom}
        onPress={handleHide}
      />
    </View>
  );
};

export default AppTab;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 8,
    shadowOpacity: 0.05,

    elevation: 4,
  },
});
