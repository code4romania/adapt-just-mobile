import React from 'react';
import RenderHtml, {
  defaultSystemFonts,
} from 'react-native-render-html';
import {
  s,
  ms,
} from 'react-native-size-matters/extend';
import { useWindowDimensions } from 'react-native';

const systemFonts = [
  ...defaultSystemFonts,
  'EncodeSans-Bold',
  'EncodeSans-Regular',
];

const HtmlContent = ({
  html = '',
  offset = s(48),
}) => {
  const { width } = useWindowDimensions();
  const contentWidth = width - offset;

  return (
    <RenderHtml
      source={{ html }}
      tagsStyles={tagStyles}
      systemFonts={systemFonts}
      contentWidth={contentWidth}
    />
  );
};

export default HtmlContent;

const tagStyles = {
  h1: {
    color: '#111827',
    fontSize: ms(24),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h2: {
    color: '#111827',
    fontSize: ms(21),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h3: {
    color: '#111827',
    fontSize: ms(18),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h4: {
    color: '#111827',
    fontSize: ms(16),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h5: {
    color: '#111827',
    fontSize: ms(14),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  h6: {
    color: '#111827',
    fontSize: ms(12),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Bold',
  },
  p: {
    color: '#111827',
    fontSize: ms(19),
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Regular',
  },
  img: {
    overflow: 'hidden',
    borderRadius: ms(8),

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
};
