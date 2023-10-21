import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors';
import {SCREEN_HEIGHT} from '../../utils/others';

const AppTheme = ({children, backgroundColor, scroll,padding}) => {
  return (
    <>
      <StatusBar hidden />
      {scroll ? (
        <ScrollView
          style={{
            backgroundColor: backgroundColor ? backgroundColor : Colors.Primary,
            flex: 1,
            maxHeight: SCREEN_HEIGHT,
            padding:padding
          }}>
          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            backgroundColor: backgroundColor ? backgroundColor : Colors.Primary,
            flex: 1,
            padding:padding
          }}>
          {children}
        </View>
      )}
    </>
  );
};

export default AppTheme;

const styles = StyleSheet.create({
  theme: {},
});
