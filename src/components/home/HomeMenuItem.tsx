import React, {
  useRef,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import { SvgXml } from 'react-native-svg';

import { ListenContext } from '~/context/ListenContext';
import ArrowRightIcon from '~/components/shared/icons/ArrowRightIcon';

const HomeMenuItem = ({
  title = '',
  icon = null,
  position = -1,
  showArrow = true,
  onPress = () => {},
}) => {
  const currentIndex = useRef(0);
  const { progress } = useContext(ListenContext);

  const getText = useCallback(() => {
    if (progress.position === position) {
      const { length } = progress;

      const t1 = title.slice(0, currentIndex.current + length);
      const t2 = title.slice(currentIndex.current + length);

      currentIndex.current += length;

      return (
        <Text style={styles.text}>
          <Text style={{ backgroundColor: 'yellow' }}>{t1}</Text>{t2}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>
          {title}
        </Text>
      );
    }
  }, [progress]);

  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={'#FBBF24'}
      onPress={onPress}
    >
      <>
        <View style={styles.content}>
          {icon && (
            <SvgXml
              xml={icon}
              height={vs(40)}
              style={styles.image}
            />
          )}

          <Text
            numberOfLines={1}
            style={styles.text}
          >
            {/* {getText()} */}
            {title}
          </Text>
        </View>
        
        {showArrow && (
          <ArrowRightIcon
            style={styles.arrow}
          />
        )}
      </>
    </TouchableHighlight>
  );
};

export default HomeMenuItem;

const styles = ScaledSheet.create({
  container: {
    maxHeight: '68@vs',
    borderWidth: '2@msr',
    borderRadius: '8@msr',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20@vs',
    borderColor: '#FBBF24',
    backgroundColor: '#FFF',
    paddingVertical: '18@vs',
    paddingHorizontal: '24@s',

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,

    // Android
    elevation: 5
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    color: '#111827',
    fontSize: '16@msr',
    lineHeight: '20@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  image: {
    marginRight: '26@s',
  },
  arrow: {
    marginLeft: '6@s',
  },
});
