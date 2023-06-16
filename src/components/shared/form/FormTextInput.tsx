import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters/extend';

const hitSlop = {
  top: 12,
  left: 12,
  right: 12,
  bottom: 12,
};

const FormTextInput = ({
  value = '',
  inputProps = {},
  placeholder = '',
  showClearButton = true,
  onChange = v => {},
}) => {
  const isMultiline = inputProps?.multiline || false;

  const containerStyle = [
    styles.container,
    isMultiline && styles.multiline,
  ];

  const inputStyle = [
    styles.input,
    isMultiline && styles.textSmall,
  ];

  return (
    <View style={containerStyle}>
      <TextInput
        value={value}
        style={inputStyle}
        autoComplete="off"
        autoCorrect={false}
        keyboardType="default"
        placeholder={placeholder}
        autoCapitalize="characters"
        placeholderTextColor="#6B7280"
        enablesReturnKeyAutomatically
        {...inputProps}
        onChangeText={onChange}
      />

      {!!value && showClearButton && (
        <TouchableOpacity
          hitSlop={hitSlop}
          style={styles.clearButton}
          onPress={() => onChange('')}
        >
          <Text style={styles.clearButtonText}>
            x
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormTextInput;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    height: '42@vs',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '6@msr',
    borderColor: '#D1D5DB',
    backgroundColor: '#FFF',
    paddingHorizontal: '13@s',

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
  multiline: {
    height: 'auto',
    minHeight: '132@vs',
    maxHeight: '150@vs',
    paddingVertical: '9@vs',
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#111827',
    fontSize: '16@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Regular',
  },
  textSmall: {
    fontSize: '14@msr',
    textAlignVertical: 'top',
  },
  clearButton: {
    width: '16@msr',
    height: '16@msr',
    alignItems: 'center',
    borderRadius: '8@msr',
    justifyContent: 'center',
    backgroundColor: '#9CA3AF',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: '12@msr',
    lineHeight: '12@msr',
    fontFamily: 'EncodeSans-Bold',
  },
});
