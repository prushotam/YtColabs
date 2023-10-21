import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SimpleBorderedFlex = ({
  children,
  borderColor,
  borderWidth,
  borderRadius,
  justifyContent,
  alignItems,
  width,
  height,
  backgroundColor,
  flex,
  flexDirection,
  marginVertical,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        justifyContent: justifyContent,
        alignItems: alignItems,
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        flex: flex,
        flexDirection: flexDirection,
        marginVertical: marginVertical,
      }}>
      {children}
    </View>
  );
};

export default SimpleBorderedFlex;

const styles = StyleSheet.create({});
