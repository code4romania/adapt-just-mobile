import React from 'react';
import { SvgXml } from 'react-native-svg';
import { vs } from 'react-native-size-matters/extend';

import { arrowRightIcon } from '~/assets/images';

const ArrowRightIcon = ({
  style = {},
}) => {
  return (
    <SvgXml
      style={style}
      height={vs(20)}
      xml={arrowRightIcon}
    />
  );
};

export default ArrowRightIcon;
