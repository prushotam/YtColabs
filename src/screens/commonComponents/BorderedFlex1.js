import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../utils/others';
import {Colors} from '../../utils/colors';

const BorderedFlex1 = ({
  children,
  borderColor,
  borderWidth,
  borderRadius,
  backgroundColor,
  flex,
  height,
  width
}) => {
  return (
    <View
      style={{
        flex: flex,
        borderColor: borderColor ? borderColor : Colors.Secondary,
        borderWidth: borderWidth ? borderWidth : SCREEN_WIDTH * 0.002,
        borderRadius: borderRadius ? borderRadius : SCREEN_WIDTH * 0.5,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:backgroundColor,
        height: height,
        width: width
      }}>
      {children}
    </View>
  );
};

export default BorderedFlex1;

const styles = StyleSheet.create({});
