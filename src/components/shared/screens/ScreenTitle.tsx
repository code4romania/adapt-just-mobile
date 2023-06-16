import React, {
  useRef,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  vs,
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import { ListenContext } from '~/context/ListenContext';

const position = 0;

const ScreenTitle = ({
  title = '',
  fontSize = ms(24),
  marginTop = vs(60),
}) => {
  const currentIndex = useRef(0);
  const { progress } = useContext(ListenContext);

  const containerStyle = { marginTop };

  const titleStyle = [
    styles.title,
    { fontSize },
  ];

  const getTitle = useCallback(() => {
    if (progress?.position === position) {
      const { length } = progress;

      const t1 = title.slice(0, currentIndex.current + length);
      const t2 = title.slice(currentIndex.current + length);

      currentIndex.current += length;

      return (
        <Text style={titleStyle}>
          <Text style={{ backgroundColor: 'yellow' }}>{t1}</Text>{t2}
        </Text>
      );
    } else {
      return (
        <Text style={titleStyle}>
          {title}
        </Text>
      );
    }
  }, [progress]);

  return (
    <View style={containerStyle}>
      {/* {getTitle()} */}
      <Text style={titleStyle}>
        {title}
      </Text>
    </View>
  );
};

export default ScreenTitle;

const styles = ScaledSheet.create({
  title: {
    color: '#111827',
    letterSpacing: '1.2@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
});
