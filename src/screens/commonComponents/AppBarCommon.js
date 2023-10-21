import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {SCREEN_HEIGHT, SCREEN_WIDTH, tvScreen} from '../../utils/others';
import { Colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const AppBarCommon = ({
  onPress,
  title,
  children,
  backgroundColor,
  enableBack,
  color,
  fontFamily,
  letterSpacing,
  mode
}) => {
  const navigation = useNavigation()
  return (
    <Appbar.Header
      mode={mode}
      elevated="true"
      dark={true}
      style={{backgroundColor: backgroundColor}}>
      {enableBack && <Appbar.BackAction onPress={()=>navigation.goBack()} iconColor={Colors.fontColorActive} />}
      <Appbar.Content
        title={title}
        titleStyle={{
          color: color,
          fontSize: tvScreen ? SCREEN_HEIGHT * 0.1 : SCREEN_WIDTH * 0.05,
          fontFamily: fontFamily,
          letterSpacing:letterSpacing
        }}
        />
        {children}
    </Appbar.Header>
  );
};

export default AppBarCommon;

const styles = StyleSheet.create({});
