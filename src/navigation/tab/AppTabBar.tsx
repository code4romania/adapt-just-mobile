import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import {
  hideIcon,
  listenIcon,
} from '~/assets/images';

const AppTabBar = ({
  state,
  insets,
  descriptors,
  navigation,
}) => {
  const paddingBottom = insets.bottom || vs(16);

  const renderTab = (route, index) => {
    const isHide = route.name === 'Hide';
    const isListen = route.name === 'Listen';

    const { options } = descriptors[route.key];
    const label = options?.tabBarLabel || options?.title || route.name;

    const icon = isHide ? hideIcon : listenIcon;

    const textStyle = [
      styles.buttonText,
      isHide && styles.hideText,
      isListen && styles.listenText,
    ];

    return (
      <TouchableOpacity
        key={route.key}
        style={[
          styles.button,
          { paddingBottom },
          isHide && styles.hideButton,
          isListen && styles.listenButton,
        ]}
        accessibilityRole="button"
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={styles.buttonIcon}
        />

        <Text style={textStyle}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {state.routes.map(renderTab)}
    </View>
  );
};

export default AppTabBar;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingTop: '16@vsr',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: '1@msr',
    justifyContent: 'center',
    borderTopColor: '#E5E7EB',
  },
  listenButton: {
    borderLeftWidth: '1@msr',
    borderRightWidth: '1@msr',
    borderLeftColor: '#E5E7EB',
    borderRightColor: '#E5E7EB',
    borderTopLeftRadius: '20@msr',
  },
  hideButton: {
    borderRightWidth: '1@msr',
    borderRightColor: '#E5E7EB',
    borderTopRightRadius: '20@msr',
  },
  buttonIcon: {
    height: '25@msr',
    marginRight: '15@sr',
  },
  buttonText: {
    fontSize: '16@msr',
    lineHeight: '20@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-SemiBold',
  },
  listenText: {
    color: '#2E2E2E',
  },
  hideText: {
    color: '#F59E0B',
  },
});
