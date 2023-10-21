import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../utils/others';
import {Button} from 'react-native-paper';

const PlainFlex1 = ({
  children,
  width,
  height,
  justifyContent,
  alignItems,
  flexDirection,
  backgroundColor,
  showButton,
  buttonTitle,
  buttonStyle,
  buttonMode,
  textColor,
  buttonColor,
  onPress
}) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        display: 'flex',
        flexDirection: flexDirection ? flexDirection : 'row',
        width: width ? width : SCREEN_WIDTH * 0.5,
        justifyContent: justifyContent,
        alignItems: alignItems,
        height:height
      }}>
      {showButton === true && (
        <Button style={buttonStyle} mode={buttonMode} textColor={textColor} buttonColor={buttonColor} onPress={onPress}>{buttonTitle}</Button>
      )}
      {children}
    </View>
  );
};

export default PlainFlex1;

const styles = StyleSheet.create({});
