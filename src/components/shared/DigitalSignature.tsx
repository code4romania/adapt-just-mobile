import React, {
  useRef,
  useMemo,
  useState,
} from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { ScaledSheet } from 'react-native-size-matters/extend';

let defaultStyle = `
.m-signature-pad {box-shadow: none; border: none;}
.m-signature-pad--body {border: none;}
.m-signature-pad--footer {display: none; margin: 0px;}
`;

const DigitalSignature = ({
  width = 200,
  height = 200,
  onSignature = (s) => {},
}) => {
  const [signature, setSignature] = useState(null);

  const ref = useRef();

  const webStyle = useMemo(() => `
    ${defaultStyle}
    body,html {
      width: ${width}px; height: ${height}px;
    }`,
  []);

  const clearSignature = () => {
    ref?.current?.clearSignature();
  };

  const handleOK = (signature) => {
    setSignature(signature);
    onSignature(signature);
  };

  const handleClear = () => {
    setSignature(null);
  };

  const handleEnd = () => {
    ref.current.readSignature();
  };

  return (
    <>
      <SignatureScreen
        ref={ref}
        bgWidth={width}
        bgHeight={height}
        autoClear={false}
        webStyle={webStyle}
        descriptionText={''}
        backgroundColor='#FFF'

        onOK={handleOK}
        onEnd={handleEnd}
        onClear={handleClear}
      />

      {signature && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearSignature}
        >
          <Text style={styles.clearText}>
            Anulează
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default DigitalSignature;

const styles = ScaledSheet.create({
  clearButton: {
    height: '32@vs',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9CA3AF40',
    borderBottomLeftRadius: '6@msr',
    borderBottomRightRadius: '6@msr',
  },
  clearText: {
    color: '#000',
    fontSize: '12@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-SemiBold',
  },
});
